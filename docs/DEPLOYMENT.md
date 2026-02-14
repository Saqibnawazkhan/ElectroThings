# Deployment Guide

## Vercel Deployment (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables
```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-domain.com
```

## Manual Deployment

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t electrothings .
docker run -p 3000:3000 electrothings
```

## Environment Setup

### Required Variables
- `NEXTAUTH_SECRET` - Auth secret key
- `NEXTAUTH_URL` - App URL

### Optional Variables
- `DATABASE_URL` - Database connection
- `STRIPE_SECRET_KEY` - Payment gateway
- `SMTP_*` - Email configuration

## Performance Optimization

- Enable compression
- Use CDN for static assets
- Configure caching headers
- Enable image optimization
