# Deployment Guide: Single Domain for Web and LMS Applications

This guide explains how to deploy both the Web and LMS applications under a single domain with subdirectory routing.

## Architecture Overview

- Main application: `yourdomain.com/` → served from Web app
- LMS application: `yourdomain.com/lms/` → served from LMS app via proxy

## Configuration Changes

### 1. LMS App Configuration (`apps/lms/next.config.ts`)

- Removed `basePath: "/lms"` to prevent double prefix issues
- Added `assetPrefix: "/lms"` for proper asset loading when proxied
- Added performance optimizations

### 2. Web App Configuration (`apps/web/next.config.ts`)

- Added rewrite rule to proxy `/lms/*` requests to the LMS service
- Removed `/lms` prefix in destination to avoid double prefixes
- Added performance headers and compression

### 3. Environment Variables

- Updated Web app to use `LMS_APP_URL` instead of `NEXT_PUBLIC_LMS_API_URL`
- This makes the variable internal to the proxy, not exposed to the client

## Deployment Process

### Local Development

```bash
# Run both applications simultaneously
yarn dev
```

This will start:
- Web app on `http://localhost:3000`
- LMS app on `http://localhost:4000`
- Access the LMS via `http://localhost:3000/lms`

### Production Build

```bash
# Build both applications
yarn build
```

This builds both applications with the proper configurations.

### Production Deployment

For production deployment, you have several options:

#### Option 1: Containerized Deployment (Docker)

1. Build both applications: `yarn build`
2. Run both applications in separate containers/services
3. Use a reverse proxy (nginx, Traefik, etc.) to route:
   - `/` → Web app
   - `/lms/` → LMS app

#### Option 2: Platform as a Service (Vercel, Netlify, etc.)

Deploy the Web app as your main application and set up the LMS app as a separate service that the Web app can proxy to.

#### Option 3: Traditional Server Deployment

1. Start the LMS app: `cd apps/lms && yarn start -p 4000`
2. Start the Web app: `cd apps/web && yarn start -p 3000`
3. Set up a reverse proxy (nginx/Apache) with the following configuration:

```nginx
upstream web_app {
    server localhost:3000;  # Web app port
}

upstream lms_app {
    server localhost:4000;  # LMS app port
}

server {
    listen 80;
    server_name yourdomain.com;

    # Main web application
    location / {
        proxy_pass http://web_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Performance optimization
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    }

    # LMS application under /lms path
    location /lms {
        # Strip the /lms prefix when forwarding to LMS app
        rewrite ^/lms/(.*)$ /$1 break;
        proxy_pass http://lms_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Performance optimization
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    }
}
```

## Key Benefits of This Approach

1. **Reduced Latency**: Direct proxying instead of static file serving
2. **Proper Routing**: No double prefix issues that cause 404s
3. **Shared Session State**: Better session management across apps
4. **Maintainable**: Each app can be developed and deployed independently
5. **Scalable**: Can scale each app independently if needed

## Troubleshooting

### Common Issues

1. **Assets not loading in LMS app**: Check that `assetPrefix: "/lms"` is set in LMS config
2. **API calls failing**: Ensure both apps use the same API endpoints in environment variables
3. **Proxy not working**: Verify that `LMS_APP_URL` points to the correct internal service

### Testing the Setup

To verify that everything works correctly:

1. Start both applications with `yarn dev`
2. Visit `http://localhost:3000` - should show the Web app
3. Visit `http://localhost:3000/lms` - should show the LMS app
4. Check browser dev tools for any 404 errors
5. Verify that assets (CSS, JS, images) load properly from both sections