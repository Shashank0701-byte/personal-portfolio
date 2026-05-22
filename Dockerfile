# ─── Stage 1: deps ────────────────────────────────────────────────────────────
# Install production + dev dependencies in a clean layer.
FROM node:20-alpine AS deps
WORKDIR /app

# Copy manifests only — layer cache busts only when these change
COPY package.json package-lock.json* ./

RUN npm ci --legacy-peer-deps

# ─── Stage 2: builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# next build reads NODE_ENV
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── Stage 3: runner ──────────────────────────────────────────────────────────
# Minimal image — only the standalone output + static assets
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Port the Next.js server listens on
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Static files (CSS, JS chunks, images)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Public assets (CV PDF, images, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# next start in standalone mode
CMD ["node", "server.js"]
