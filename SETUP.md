# Portfolio Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up EmailJS (for contact form):**
   - Create an account at https://www.emailjs.com/
   - Get your Service ID, Template ID, and Public Key
   - Copy `.env.example` to `.env` and fill in your credentials:
     ```bash
     cp .env.example .env
     ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Customize your content:**
   - Update `src/components/sections/Hero.tsx` - Change name and title
   - Update `src/data/projects.ts` - Add your projects
   - Update `src/data/skills.ts` - Update your skills
   - Update `src/data/socialLinks.ts` - Add your social links
   - Update `index.html` - Update SEO meta tags

## Important Notes

- **Node.js Version**: This project requires Node.js 20.19+ or 22.12+. If you're using an older version, you may see warnings but the build should still work.

- **Tailwind CSS v4**: This project uses Tailwind CSS v4 which has a different configuration approach. Custom colors are defined in `src/styles/globals.css` as CSS variables.

- **EmailJS Setup**: The contact form requires EmailJS configuration. Without it, the form will show an error when submitted.

## Customization Checklist

- [ ] Update hero name and title
- [ ] Add your projects with GitHub/live URLs
- [ ] Update skills list
- [ ] Add social media links
- [ ] Update SEO meta tags in `index.html`
- [ ] Configure EmailJS for contact form
- [ ] Add your resume file (if using download button)
- [ ] Update favicon and OG image

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to Vercel, Netlify, or any static hosting service.

