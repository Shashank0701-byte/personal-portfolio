# GitHub Stats Integration

This portfolio automatically fetches and displays live GitHub statistics including:
- Contribution graph
- Total contributions
- Current streak
- Public repositories
- Top repositories by stars

## Features

✅ **Automatic Updates** - Data refreshes every 6 hours automatically
✅ **Smart Caching** - Uses localStorage to minimize API calls
✅ **Manual Refresh** - Click the refresh button to update immediately
✅ **Loading States** - Skeleton loaders while fetching data
✅ **Error Handling** - Graceful fallback to cached data on errors
✅ **Last Updated Timestamp** - Shows when data was last fetched

## Setup

### Basic Setup (No Token Required)

The integration works out of the box without any configuration. GitHub's public API allows 60 requests per hour per IP address.

### Advanced Setup (Higher Rate Limits)

For higher rate limits (5,000 requests per hour), add a GitHub Personal Access Token:

1. **Create a GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "Portfolio Stats")
   - Select scopes: `public_repo` (read-only access to public repositories)
   - Click "Generate token"
   - Copy the token (you won't be able to see it again!)

2. **Add Token to Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

3. **Update OpenSource Component** (Optional):
   Uncomment the token line in `src/components/sections/OpenSource.tsx`:
   ```typescript
   const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
   const { stats, loading, error, refresh } = useGitHubStats(githubUsername, githubToken);
   ```

## How It Works

### Data Flow

```
User visits page
    ↓
Check localStorage cache
    ↓
Cache valid (< 6 hours)?
    ├─ Yes → Use cached data
    └─ No  → Fetch from GitHub API
        ↓
    Store in cache
        ↓
    Display data
```

### API Calls

The system makes 3 parallel API calls:

1. **User Data** (REST API)
   ```
   GET https://api.github.com/users/{username}
   ```

2. **Repositories** (REST API)
   ```
   GET https://api.github.com/users/{username}/repos?sort=updated&per_page=100
   ```

3. **Contributions** (GraphQL API)
   ```
   POST https://api.github.com/graphql
   ```

### Caching Strategy

- **Duration**: 6 hours
- **Storage**: localStorage
- **Key**: `github_stats_cache`
- **Invalidation**: Automatic after 6 hours or manual refresh

### Streak Calculation

The system calculates two types of streaks:

- **Current Streak**: Consecutive days with contributions from today backwards
- **Longest Streak**: Maximum consecutive days with contributions in the past year

## Files

```
src/
├── services/
│   └── githubService.ts       # GitHub API integration
├── hooks/
│   └── useGitHubStats.ts      # React hook for stats
└── components/
    └── sections/
        └── OpenSource.tsx      # UI component
```

## Customization

### Update GitHub Username

In `src/components/sections/OpenSource.tsx`:
```typescript
const githubUsername = "your-github-username";
```

### Adjust Cache Duration

In `src/services/githubService.ts`:
```typescript
const CACHE_DURATION = 6 * 60 * 60 * 1000; // Change to desired milliseconds
```

### Modify Repository Count

In `src/components/sections/OpenSource.tsx`:
```typescript
const topRepos = useMemo(() => {
  if (!stats?.repos) return [];
  return stats.repos.slice(0, 6); // Change number here
}, [stats?.repos]);
```

## Troubleshooting

### Rate Limit Errors

**Problem**: "Failed to load GitHub stats"
**Solution**: 
- Wait an hour for rate limit to reset
- Add a GitHub token (see Advanced Setup)
- Data will fallback to cache automatically

### No Data Showing

**Problem**: Stats show as 0
**Solution**:
- Check browser console for errors
- Verify GitHub username is correct
- Check if GitHub profile is public
- Clear cache and refresh

### Clear Cache Manually

Open browser console and run:
```javascript
localStorage.removeItem('github_stats_cache');
location.reload();
```

## Performance

- **Initial Load**: ~500-800ms (with cache)
- **Fresh Fetch**: ~1-2 seconds (3 parallel API calls)
- **Cache Hit**: <10ms
- **Bundle Size**: +15KB (service + hook)

## Security

✅ **No Sensitive Data**: Only public GitHub data is fetched
✅ **Token Safety**: Token is stored in `.env` (not committed to git)
✅ **Client-Side Only**: No server required
✅ **CORS Safe**: GitHub API supports CORS

## Future Enhancements

- [ ] Add contribution heatmap visualization
- [ ] Show language statistics
- [ ] Display recent activity timeline
- [ ] Add GitHub Actions workflow for static generation
- [ ] Implement Redis caching for server-side rendering

## License

MIT
