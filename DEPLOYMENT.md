# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com with GitHub)
- Your portfolio code pushed to GitHub

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository (`personal-portfolio`)
4. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variables (if using GitHub token):
   - Click "Environment Variables"
   - Add: `VITE_GITHUB_TOKEN` = `your_github_token_here`
6. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio (or your choice)
# - Directory? ./ (current directory)
# - Override settings? No

# For production deployment
vercel --prod
```

### 3. Configure Environment Variables (Optional)

If you're using the GitHub token for higher API rate limits:

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name**: `VITE_GITHUB_TOKEN`
   - **Value**: Your GitHub personal access token
   - **Environment**: Production, Preview, Development (select all)
3. Redeploy for changes to take effect

### 4. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will auto-provision SSL certificate

## Automatic Deployments

Once connected to GitHub:
- **Every push to `main`** → Production deployment
- **Every pull request** → Preview deployment
- **Automatic builds** on code changes

## Vercel Configuration

The `vercel.json` file in your project root configures:
- Build command
- Output directory
- Dev command
- Install command

## Post-Deployment Checklist

✅ Check all pages load correctly
✅ Verify GitHub stats are fetching
✅ Test contact form (EmailJS)
✅ Check all project images display
✅ Test responsive design on mobile
✅ Verify all links work (GitHub, LinkedIn, etc.)
✅ Check Open Graph meta tags for social sharing

## Troubleshooting

### Build Fails
- Check `package.json` for correct scripts
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure they're prefixed with `VITE_`
- Redeploy after adding variables
- Check they're set for correct environment

### Images Not Loading
- Ensure images are in `public` folder
- Use absolute paths starting with `/`
- Check file names match exactly (case-sensitive)

### 404 on Refresh
- Vercel handles this automatically for SPAs
- No additional configuration needed for React Router

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Remove deployment
vercel remove [deployment-url]

# Open project in browser
vercel open
```

## Your Portfolio URLs

After deployment, you'll get:
- **Production**: `https://your-project.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)
- **Preview**: Unique URL for each PR/branch

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Gzip compression
- ✅ HTTP/2 support

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
