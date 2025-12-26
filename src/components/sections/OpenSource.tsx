import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star, GitPullRequest, RefreshCw, Clock } from 'lucide-react';
import CosmicBackground from '../ui/CosmicBackground';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { useMemo } from 'react';

// Hacktoberfest data (manual, as it's event-specific)
const hacktoberfestData = {
    year: 2025,
    prsCompleted: 11,
    participated: true
};

export const OpenSource = () => {
    const githubUsername = "Shashank0701-byte";

    // Optional: Add GitHub token as environment variable for higher rate limits
    const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
    const { stats, loading, error, refresh } = useGitHubStats(githubUsername, githubToken);

    // Format last updated time
    const lastUpdatedText = useMemo(() => {
        if (!stats?.lastUpdated) return null;

        const date = new Date(stats.lastUpdated);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffHours < 1) return 'Updated just now';
        if (diffHours === 1) return 'Updated 1 hour ago';
        if (diffHours < 24) return `Updated ${diffHours} hours ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Updated 1 day ago';
        return `Updated ${diffDays} days ago`;
    }, [stats?.lastUpdated]);

    // Get top repositories from live data
    const topRepos = useMemo(() => {
        if (!stats?.repos) return [];
        return stats.repos.slice(0, 6).map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
            url: repo.html_url
        }));
    }, [stats?.repos]);

    return (
        <section
            id="opensource"
            className="relative py-32 min-h-screen flex items-center overflow-hidden"
        >
            {/* Cosmic Background - using 'projects' variant for dark fluid texture */}
            <CosmicBackground variant="projects" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">
                        Open Source
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Building in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Public</span>
                    </h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Contributing to the developer community through open-source projects and consistent development activity.
                    </p>
                </motion.div>

                {/* GitHub Contribution Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                            <h4 className="text-xl font-bold text-white">GitHub Activity</h4>
                            <div className="flex items-center gap-3">
                                {/* Last Updated Indicator */}
                                {lastUpdatedText && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Clock size={14} />
                                        <span>{lastUpdatedText}</span>
                                    </div>
                                )}

                                {/* Refresh Button */}
                                <button
                                    onClick={refresh}
                                    disabled={loading}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Refresh GitHub data"
                                >
                                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                                    <span>{loading ? 'Updating...' : 'Refresh'}</span>
                                </button>

                                {/* View Profile Link */}
                                <a
                                    href={`https://github.com/${githubUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                                >
                                    <span>View Profile</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>

                        {/* GitHub Contribution Graph Embed */}
                        <div className="rounded-lg overflow-hidden bg-slate-950/50 p-4">
                            <img
                                src={`https://ghchart.rshah.org/22d3ee/${githubUsername}`}
                                alt="GitHub Contribution Graph"
                                className="w-full opacity-90 hover:opacity-100 transition-opacity"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>

                        {/* Stats Row */}
                        {loading ? (
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="text-center p-4 bg-white/5 rounded-lg border border-white/5 animate-pulse">
                                        <div className="h-8 bg-white/10 rounded mb-2" />
                                        <div className="h-3 bg-white/5 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                                <p className="text-red-400 text-sm">Failed to load GitHub stats. Using cached data.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-cyan-400">{stats?.totalContributions || 0}+</div>
                                    <div className="text-xs text-slate-400 mt-1">Contributions</div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-purple-400">{stats?.currentStreak || 0}</div>
                                    <div className="text-xs text-slate-400 mt-1">Day Streak</div>
                                </div>
                                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-pink-400">{stats?.user?.public_repos || 0}</div>
                                    <div className="text-xs text-slate-400 mt-1">Public Repos</div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Hacktoberfest Badge */}
                {hacktoberfestData.participated && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-16"
                    >
                        <div className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                                        🎃
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-xl font-bold text-white mb-2">
                                        Hacktoberfest {hacktoberfestData.year} Participant
                                    </h4>
                                    <p className="text-slate-300">
                                        Completed <span className="text-orange-400 font-semibold">{hacktoberfestData.prsCompleted} pull requests</span> during Hacktoberfest, contributing to open-source projects and the developer community.
                                    </p>
                                </div>
                                <a
                                    href="https://hacktoberfest.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-orange-300 transition-all"
                                >
                                    <span className="text-sm font-medium">Learn More</span>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Notable Repositories */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h4 className="text-2xl font-bold text-white mb-8 text-center">Notable Repositories</h4>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-pulse">
                                    <div className="h-6 bg-white/10 rounded mb-4 w-3/4" />
                                    <div className="h-4 bg-white/5 rounded mb-2" />
                                    <div className="h-4 bg-white/5 rounded mb-4 w-2/3" />
                                    <div className="flex gap-4">
                                        <div className="h-3 bg-white/5 rounded w-16" />
                                        <div className="h-3 bg-white/5 rounded w-12" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : topRepos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {topRepos.map((repo, index) => (
                                <motion.a
                                    key={repo.name}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <GitPullRequest size={20} className="text-cyan-400" />
                                            <h5 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {repo.name}
                                            </h5>
                                        </div>
                                        <ExternalLink size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>

                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                        {repo.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                            <span>{repo.language}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <Star size={14} />
                                            <span>{repo.stars}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-400">
                                            <GitFork size={14} />
                                            <span>{repo.forks}</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-xl">
                            <p className="text-slate-400">No repositories found</p>
                        </div>
                    )}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-400 text-sm italic">
                        "Open source is about collaboration, learning, and giving back to the community."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
