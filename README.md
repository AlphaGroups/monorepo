# Monorepo Structure and Azure Deployment Guide

## Overview

This is a monorepo containing two applications:
- `apps/web` - The main web application (front-facing website)
- `apps/lms` - The Learning Management System application

The monorepo uses Yarn workspaces to manage dependencies across both applications efficiently.

## Monorepo Structure

```
monorepo/
├── package.json                 # Root workspace configuration
├── yarn.lock                    # Root-level dependency lockfile
├── DEPLOYMENT.md               # Deployment strategy documentation
├── AUTH_HANDLING.md            # Authentication handling documentation
├── apps/
│   ├── web/                    # Main web application
│   │   ├── package.json
│   │   ├── next.config.ts      # Static export configuration
│   │   ├── staticwebapp.config.json # Azure Static Web Apps configuration
│   │   └── ...
│   └── lms/                    # LMS application
│       ├── package.json
│       ├── next.config.ts      # Server-side application configuration  
│       └── ...
└── node_modules/              # Root-level shared dependencies
```

## Applications Overview

### Web Application (`apps/web`)
- Built with Next.js (static export mode)
- Serves as the main landing page and front-end
- Configured to proxy requests to the LMS app under the `/lms` path
- Deployed as an Azure Static Web App

### LMS Application (`apps/lms`)
- Built with Next.js (server-side rendering mode)
- Serves as the Learning Management System
- Runs on a separate server/process
- Handles authentication and user management

## Deployment Architecture to Azure

### Current Deployment Setup

The `.github/workflows/main_alpha-web-app.yml` file shows that you're deploying to Azure Static Web Apps using GitHub Actions:

```yaml
name: Deploy via publish profile

on: push

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Azure Web App (publish profile)
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'alpha-web-app'
          publish-profile: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          package: .
```

### Architecture Pattern

Based on the deployment documentation, your architecture follows this pattern:

1. **Main Application**: `yourdomain.com/` → served from the Web app
2. **LMS Application**: `yourdomain.com/lms/` → served from the LMS app via proxy

### Configuration Details

#### Web App Configuration
- Uses static export (`output: "export"` in next.config.ts)
- Rewrites `/lms/:path*` requests to the LMS API
- Includes security headers in `staticwebapp.config.json`

#### LMS App Configuration
- Originally had `basePath: "/lms"` in next.config.ts (though the deployment guide suggests removing this)
- Uses `assetPrefix: "/lms"` for proper asset loading when proxied
- Runs as a server-side application

### Deployment Process

#### For Development
```bash
# Run both applications simultaneously
yarn dev
```
This starts:
- Web app on `http://localhost:3000`
- LMS app on `http://localhost:4000`
- Access the LMS via `http://localhost:3000/lms`

#### For Production
```bash
# Build both applications
yarn build
```

## Azure Deployment Strategy

### Option 1: Azure Static Web Apps (Current)
- Deploy the Web app as a static site to Azure Static Web Apps
- The staticwebapp.config.json handles routing and security headers
- LMS app needs to be deployed separately (likely to Azure App Service)

### Option 2: Containerized Deployment (Alternative)
1. Build both applications: `yarn build`
2. Run both applications in separate Azure App Service containers/services
3. Use Azure Application Gateway or App Service's built-in routing to handle:
   - `/` → Web app
   - `/lms/` → LMS app

### Proxy Configuration
The web app's `next.config.ts` includes rewrite rules that proxy `/lms/*` requests to the LMS service. In the production environment, you'll need to ensure that the `NEXT_PUBLIC_LMS_API_URL` environment variable points to your deployed LMS application in Azure.

## Authentication Handling

Authentication is handled with multiple layers of protection:
- Axios interceptors for handling 401 responses
- Periodic token validation (every 5 minutes)
- Role-based redirects on 404 pages
- JWT token validation and refresh logic

## Key Benefits of This Approach

1. **Reduced Latency**: Direct proxying instead of static file serving
2. **Proper Routing**: No double prefix issues that cause 404s
3. **Shared Session State**: Better session management across apps
4. **Maintainable**: Each app can be developed and deployed independently
5. **Scalable**: Can scale each app independently if needed

## Deployment Considerations for Azure

When deploying to Azure:

1. **Web App**: Deploy to Azure Static Web Apps or Azure App Service
2. **LMS App**: Deploy to Azure App Service or containerized environment
3. **Environment Variables**: Ensure `NEXT_PUBLIC_LMS_API_URL` points to the deployed LMS app
4. **Security**: Use Azure Application Gateway for advanced routing and security if needed
5. **Monitoring**: Set up Azure Application Insights for both applications