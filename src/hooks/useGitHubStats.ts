import { useState, useEffect } from 'react';
import { fetchGitHubStats, clearGitHubCache, getCacheAge } from '../services/githubService';

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

interface GitHubStats {
    user: GitHubUser;
    repos: GitHubRepo[];
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    contributionDays: any[];
    lastUpdated: string;
}

interface UseGitHubStatsReturn {
    stats: GitHubStats | null;
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
    cacheAge: number | null;
}

/**
 * Custom hook to fetch and manage GitHub statistics
 * 
 * @param username - GitHub username
 * @param token - Optional GitHub personal access token for higher rate limits
 * @returns GitHub stats, loading state, error, and refresh function
 */
export function useGitHubStats(username: string, token?: string): UseGitHubStatsReturn {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [cacheAge, setCacheAge] = useState<number | null>(null);

    const loadStats = async (forceRefresh = false) => {
        try {
            setLoading(true);
            setError(null);

            if (forceRefresh) {
                clearGitHubCache();
            }

            const data = await fetchGitHubStats(username, token);
            setStats(data);
            setCacheAge(getCacheAge());
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch GitHub stats'));
            console.error('Error in useGitHubStats:', err);
        } finally {
            setLoading(false);
        }
    };

    const refresh = async () => {
        await loadStats(true);
    };

    useEffect(() => {
        loadStats();

        // Set up periodic refresh every 6 hours
        const interval = setInterval(() => {
            loadStats();
        }, 6 * 60 * 60 * 1000); // 6 hours

        return () => clearInterval(interval);
    }, [username, token]);

    return {
        stats,
        loading,
        error,
        refresh,
        cacheAge,
    };
}
