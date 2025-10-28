# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root-level workspace files
COPY package.json yarn.lock ./

# Copy only LMS workspace (and optionally shared utils if needed)
COPY apps/lms ./apps/lms

# Install dependencies — use full install (need dev deps for build)
RUN yarn install --frozen-lockfile --non-interactive --ignore-engines

# Build the LMS app
WORKDIR /app/apps/lms
RUN yarn build


# ---------- RUNTIME STAGE ----------
FROM node:22-alpine AS runner

WORKDIR /app

# Copy the built LMS app from builder
COPY --from=builder /app/apps/lms ./

# Install only production dependencies
RUN yarn install --production --non-interactive --ignore-engines

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the SSR app
CMD ["yarn", "start"]
