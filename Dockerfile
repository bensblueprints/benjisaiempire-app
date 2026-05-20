# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat

FROM base AS deps
COPY package.json ./
# install with --ignore-scripts so postinstall (prisma generate) doesn't run yet — prisma/ isn't copied here
RUN npm install --include=dev --ignore-scripts --no-audit --no-fund

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Isolate build from Coolify runtime secrets (real DATABASE_URL breaks page data collection).
ENV DATABASE_URL=postgresql://build:build@localhost/build
ENV NEXT_TELEMETRY_DISABLED=1
ENV USE_AIRWALLEX=false
ENV NEXT_PUBLIC_USE_AIRWALLEX=false
ENV RESEND_API_KEY=build-placeholder
ENV STRIPE_SECRET_KEY=sk_test_build_placeholder
ENV STRIPE_PUBLISHABLE_KEY=pk_test_build_placeholder
ENV EMAIL_FROM=build@example.com
ENV AUTH_SECRET=build-placeholder-secret-min-32-chars-long
ENV AUTH_URL=https://benjisaiempire.com
ENV AUTH_TRUST_HOST=true
ENV NEXT_PUBLIC_SITE_URL=https://benjisaiempire.com
ENV ADMIN_EMAILS=build@example.com
RUN npx prisma generate
RUN DATABASE_URL=postgresql://build:build@localhost/build \
    USE_AIRWALLEX=false NEXT_PUBLIC_USE_AIRWALLEX=false \
    npm run build

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["sh", "-c", "node node_modules/prisma/build/index.js db push --schema=prisma/schema.prisma --skip-generate && node server.js"]
