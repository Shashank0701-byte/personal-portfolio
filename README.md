# Premium Portfolio Website

A modern, animated, fully responsive portfolio website with a dark + neon gradient theme, inspired by Apple, Vercel, Stripe, and Dribbble design languages.

## Features

- 🎨 **Modern Design**: Dark theme with neon gradients and glassmorphism effects
- ✨ **Smooth Animations**: Framer Motion powered animations throughout
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎯 **Interactive Elements**: 3D hover effects, parallax scrolling, and scroll-triggered animations
- 📧 **Contact Form**: Integrated with EmailJS for form submissions
- ⚡ **Performance**: Optimized with Vite for fast loading times

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **EmailJS** for contact form
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your EmailJS credentials:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/sections/Hero.tsx` to update your name and title
2. **About Section**: Edit `src/components/sections/About.tsx` to update timeline and stats
3. **Projects**: Edit `src/data/projects.ts` to add/update your projects
4. **Skills**: Edit `src/data/skills.ts` to update your skills
5. **Social Links**: Edit `src/data/socialLinks.ts` to update your social media links
6. **Contact Info**: Update social links in the Contact section

### Styling

- Colors: Edit `tailwind.config.js` to customize the color palette
- Typography: Update font sizes and families in `tailwind.config.js`
- Animations: Modify animation timings in `src/styles/animations.css`

### SEO

Update meta tags in `index.html`:
- Title
- Description
- Open Graph tags
- Twitter Card tags

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

The site can be deployed to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `dist` folder

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── layout/      # Navbar and Footer
│   │   ├── sections/    # Page sections
│   │   └── animations/  # Animation components
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Data files (projects, skills, etc.)
│   ├── styles/          # Global styles and animations
│   └── utils/           # Utility functions
├── public/              # Static assets
└── index.html          # HTML template
```

## License

MIT License - feel free to use this for your own portfolio!

## Credits

- Design inspiration from Apple, Vercel, Stripe, and Dribbble
- Icons by [Lucide](https://lucide.dev/)
- Fonts by Google Fonts (Inter, JetBrains Mono)
