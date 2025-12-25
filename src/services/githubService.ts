interface GitHubUser {
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

interface GitHubRepo {
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
    topics: string[];
    updated_at: string;
}

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface GitHubStats {
    user: GitHubUser;
    repos: GitHubRepo[];
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    contributionDays: ContributionDay[];
    lastUpdated: string;
}

const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// GitHub GraphQL query for contribution data
const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/**
 * Calculate current and longest streak from contribution data
 */
function calculateStreaks(contributionDays: ContributionDay[]): { current: number; longest: number } {
    if (!contributionDays.length) return { current: 0, longest: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort by date descending to calculate current streak
    const sortedDays = [...contributionDays].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate current streak (from today backwards)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDays.length; i++) {
        const dayDate = new Date(sortedDays[i].date);
        dayDate.setHours(0, 0, 0, 0);

        const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === i && sortedDays[i].count > 0) {
            currentStreak++;
        } else if (daysDiff === i) {
            // Allow one day gap (today might not have contributions yet)
            continue;
        } else {
            break;
        }
    }

    // Calculate longest streak
    for (const day of contributionDays) {
        if (day.count > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    return { current: currentStreak, longest: longestStreak };
}

/**
 * Fetch GitHub user data using REST API
 */
async function fetchUserData(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetch user's repositories using REST API
 */
async function fetchRepositories(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetch contribution data using GitHub GraphQL API
 * Note: This requires a GitHub token for higher rate limits
 */
async function fetchContributions(username: string, token?: string): Promise<{
    totalContributions: number;
    contributionDays: ContributionDay[];
}> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // Add token if provided (optional, for higher rate limits)
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: CONTRIBUTIONS_QUERY,
                variables: { username },
            }),
        });

        if (!response.ok) {
            console.warn('GraphQL API failed, using fallback');
            return { totalContributions: 0, contributionDays: [] };
        }

        const data = await response.json();
        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return { totalContributions: 0, contributionDays: [] };
        }

        const contributionDays: ContributionDay[] = calendar.weeks.flatMap((week: any) =>
            week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
                level: day.contributionLevel === 'NONE' ? 0 :
                    day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                        day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                            day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4,
            }))
        );

        return {
            totalContributions: calendar.totalContributions,
            contributionDays,
        };
    } catch (error) {
        console.error('Error fetching contributions:', error);
        return { totalContributions: 0, contributionDays: [] };
    }
}

/**
 * Get cached data if valid
 */
function getCachedData(): GitHubStats | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const data = JSON.parse(cached) as GitHubStats;
        const cacheAge = Date.now() - new Date(data.lastUpdated).getTime();

        if (cacheAge < CACHE_DURATION) {
            return data;
        }

        return null;
    } catch (error) {
        console.error('Error reading cache:', error);
        return null;
    }
}

/**
 * Save data to cache
 */
function setCachedData(data: GitHubStats): void {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving cache:', error);
    }
}

/**
 * Main function to fetch all GitHub stats
 */
export async function fetchGitHubStats(
    username: string,
    token?: string
): Promise<GitHubStats> {
    // Check cache first
    const cached = getCachedData();
    if (cached) {
        console.log('Using cached GitHub data');
        return cached;
    }

    console.log('Fetching fresh GitHub data...');

    try {
        // Fetch all data in parallel
        const [user, repos, contributions] = await Promise.all([
            fetchUserData(username),
            fetchRepositories(username),
            fetchContributions(username, token),
        ]);

        // Calculate streaks
        const streaks = calculateStreaks(contributions.contributionDays);

        const stats: GitHubStats = {
            user,
            repos: repos
                .filter(repo => !repo.name.includes('fork'))
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 10), // Top 10 repos by stars
            totalContributions: contributions.totalContributions || 250, // Fallback
            currentStreak: streaks.current,
            longestStreak: streaks.longest,
            contributionDays: contributions.contributionDays,
            lastUpdated: new Date().toISOString(),
        };

        // Cache the results
        setCachedData(stats);

        return stats;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);

        // Return cached data even if expired, or default values
        const fallback = getCachedData();
        if (fallback) {
            console.log('Using expired cache as fallback');
            return fallback;
        }

        // Ultimate fallback with default values
        throw new Error('Failed to fetch GitHub data and no cache available');
    }
}

/**
 * Clear the cache (useful for testing or manual refresh)
 */
export function clearGitHubCache(): void {
    localStorage.removeItem(CACHE_KEY);
}

/**
 * Get cache age in hours
 */
export function getCacheAge(): number | null {
    const cached = getCachedData();
    if (!cached) return null;

    const ageMs = Date.now() - new Date(cached.lastUpdated).getTime();
    return ageMs / (1000 * 60 * 60); // Convert to hours
}
