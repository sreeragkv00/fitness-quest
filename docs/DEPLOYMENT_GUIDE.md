# Deployment Guide - Fitness Quest

## Backend Deployment

### Heroku

#### 1. Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### 2. Create Heroku App
```bash
heroku create fitness-quest-api
```

#### 3. Set Environment Variables
```bash
heroku config:set JWT_SECRET=your_production_secret_key
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set NODE_ENV=production
```

#### 4. Deploy
```bash
cd backend
git subtree push --prefix backend heroku main
```

### Railway or Render

1. Connect GitHub repository
2. Select `backend` directory
3. Add environment variables
4. Deploy

## Web App Deployment

### Vercel (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy
```bash
cd web
vercel
```

#### 3. Configure
- Set `REACT_APP_API_URL` to your backend URL
- Configure custom domain

### Netlify

1. Connect GitHub to Netlify
2. Select `web` directory
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

## Mobile App Deployment

### EAS Build (Expo)

#### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Login
```bash
eas login
```

#### 3. Build
```bash
cd mobile
eas build --platform ios
eas build --platform android
```

### App Stores

**iOS App Store:**
1. Generate certificates via EAS
2. Submit via App Store Connect
3. Wait for review (24-48 hours)

**Google Play:**
1. Generate keystore via EAS
2. Submit via Google Play Console
3. Wait for review (1-4 hours)

## Database Deployment

### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster (free tier available)
3. Add IP whitelist
4. Create database user
5. Get connection string
6. Use as `MONGODB_URI`

## SSL/TLS Certificates

### Free with Let's Encrypt

Most platforms (Vercel, Netlify, Heroku) provide free SSL by default.

## Environment Variables Checklist

- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET` (strong, unique)
- [ ] `MONGODB_URI` (Atlas)
- [ ] `CORS_ORIGIN` (frontend URL)
- [ ] API endpoints configured
- [ ] Email service (optional)

## Monitoring

### Backend
- Heroku: Monitor > Logs
- Sentry: For error tracking
- New Relic: For performance

### Frontend
- Vercel Analytics
- Google Analytics
- Sentry (errors)

### Database
- MongoDB Atlas dashboard
- Performance monitoring
- Backup settings

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod
```

## Cost Estimation

- **Backend**: $7/mo (Heroku) or free (Railway/Render free tier)
- **Frontend**: Free (Vercel/Netlify)
- **Database**: Free (MongoDB Atlas free tier)
- **Total**: ~$7/mo or completely free with free tiers

## Performance Optimization

### Backend
- Enable compression: `helmet`
- Cache API responses
- Database indexing
- Connection pooling

### Frontend
- Code splitting
- Image optimization
- Lazy loading
- Minification

### Database
- Index frequently queried fields
- Archive old data
- Enable sharding if needed

---

For more help, check the [Setup Guide](./SETUP_GUIDE.md)
