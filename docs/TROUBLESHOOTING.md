# Troubleshooting Guide

## Backend Issues

### MongoDB Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. Start MongoDB:
   ```bash
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod            # Linux
   ```

2. Check `MONGODB_URI` in `.env`

3. If using MongoDB Atlas:
   - Verify IP whitelist includes your IP
   - Check username/password
   - Ensure cluster is active

4. Test connection:
   ```bash
   mongosh "mongodb://localhost:27017"
   ```

### Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### JWT Token Errors

**Error:**
```
JsonWebTokenError: invalid signature
```

**Solution:**
- Ensure `JWT_SECRET` is the same in `.env` on all restarts
- If changed, users must re-login

### CORS Blocked

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
Update `CORS_ORIGIN` in backend `.env`:
```
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://yourdomain.com
```

## Web App Issues

### Blank Screen

**Solutions:**
1. Check browser console for errors
2. Ensure backend is running
3. Clear browser cache:
   ```bash
   # Or manually: DevTools > Application > Clear Storage
   ```
4. Restart dev server:
   ```bash
   npm run dev
   ```

### API Calls Failing

**Solutions:**
1. Verify backend is running on port 5000
2. Check network tab in DevTools
3. Verify `REACT_APP_API_URL` is correct
4. Try direct curl request:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Redux State Not Updating

**Solutions:**
1. Check Redux DevTools extension
2. Verify reducers are correct
3. Check for async issues
4. Use Redux logger:
   ```bash
   npm install redux-logger
   ```

### Login Loop

**Solutions:**
1. Clear localStorage:
   ```javascript
   localStorage.clear()
   // Then refresh
   ```
2. Check token expiration
3. Verify auth endpoint works

## Mobile App Issues

### App Won't Start

**Solutions:**
1. Clear Expo cache:
   ```bash
   expo prebuild --clean
   npm start -- --clear
   ```

2. Reset node_modules:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Update Expo:
   ```bash
   npm install expo@latest
   ```

### QR Code Not Working

**Solutions:**
1. Install Expo Go app
2. Ensure same network
3. Try manual IP instead of QR:
   ```bash
   npm start
   # Copy the IP address shown
   # In Expo Go: Connection > Manually enter URI
   ```

### Network Timeout

**Solutions:**
1. Ensure backend is accessible
2. Check firewall settings
3. Use actual IP, not localhost:
   ```javascript
   // In mobile/src/api/client.js
   const API_BASE_URL = 'http://192.168.x.x:5000/api'
   ```

### iOS Simulator Issues

**Solutions:**
1. Restart Xcode
2. Clear derived data:
   ```bash
   rm -rf ~/Library/Developer/Xcode/DerivedData/*
   ```
3. Update iOS SDK

### Android Emulator Issues

**Solutions:**
1. Restart emulator
2. Update Android SDK
3. Use `-c` flag to clear cache:
   ```bash
   npm run android -- -c
   ```

## Database Issues

### Database Growing Too Large

**Solutions:**
1. Archive old workouts:
   ```javascript
   db.workouts.deleteMany({ date: { $lt: ISODate("2023-01-01") } })
   ```
2. Enable compression
3. Remove duplicate data

### Slow Queries

**Solutions:**
1. Add indexes:
   ```javascript
   db.workouts.createIndex({ userId: 1, date: -1 })
   db.users.createIndex({ "fitness.level": -1 })
   ```
2. Analyze query performance
3. Use MongoDB Atlas Performance Advisor

### Backup & Recovery

**Backup:**
```bash
mongodump --uri "mongodb://localhost:27017/fitness-quest" --out ./backup
```

**Restore:**
```bash
mongorestore --uri "mongodb://localhost:27017/fitness-quest" ./backup/fitness-quest
```

## Performance Issues

### Slow API Responses

**Solutions:**
1. Add caching middleware
2. Optimize database queries
3. Add pagination
4. Check server resources

### High Memory Usage

**Solutions:**
1. Check for memory leaks:
   ```bash
   node --inspect src/server.js
   ```
2. Limit query results
3. Clear old sessions

## Deployment Issues

### Heroku Deployment Failed

**Solutions:**
1. Check Heroku logs:
   ```bash
   heroku logs --tail
   ```
2. Verify Procfile exists
3. Check environment variables
4. Ensure Node version compatible

### Vercel Build Failed

**Solutions:**
1. Check build logs in Vercel dashboard
2. Ensure `public` directory exists
3. Check for build-time errors
4. Verify environment variables set

## Getting Help

1. **GitHub Issues** - Report bugs
2. **Discussions** - Ask questions
3. **Documentation** - Read guides
4. **Community** - Discord server

---

Still stuck? [Open an Issue](https://github.com/sreeragkv00/fitness-quest/issues) 🆘
