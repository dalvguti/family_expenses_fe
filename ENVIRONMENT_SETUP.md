# Environment Setup for Frontend

## Required Environment Variables

Create a `.env` file in the root of the `marriage_billing` directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Environment Variable Descriptions

### REACT_APP_API_URL
- **Type:** String
- **Required:** Yes
- **Description:** The base URL for the backend API
- **Default:** `http://localhost:5000/api`

**Examples:**

#### Local Development:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Production (example):
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

#### Custom Backend Port:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Important Notes

### ⚠️ React Environment Variable Rules

1. **Prefix Requirement:** All custom environment variables MUST start with `REACT_APP_`
   - ✅ `REACT_APP_API_URL`
   - ❌ `API_URL` (won't work)

2. **Rebuild Required:** After changing `.env` file, you MUST restart the development server
   ```bash
   # Stop the server (Ctrl+C)
   # Start it again
   npm start
   ```

3. **Build Time Variables:** Environment variables are embedded at BUILD time, not runtime
   - Changes to `.env` during development require server restart
   - For production builds, set env vars before running `npm run build`

## Multiple Environment Files

Create React App supports multiple environment files:

```
.env                # Default for all environments
.env.local          # Local overrides (ignored by git)
.env.development    # Development environment
.env.production     # Production environment
```

**Priority:** `.env.local` > `.env.development` > `.env`

## Example Setup

### Development Environment

Create `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production Environment

Create `.env.production`:
```env
REACT_APP_API_URL=https://api.yourapp.com/api
```

## Accessing Environment Variables

In your React code:

```javascript
// ✅ Correct way
const apiUrl = process.env.REACT_APP_API_URL;

// ✅ With fallback
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## Security Best Practices

### ⚠️ Do NOT store sensitive data in React environment variables!

**Why?**
- All `REACT_APP_*` variables are embedded in the build
- They are visible in the browser's JavaScript
- Anyone can read them by inspecting your code

**Never include:**
- API keys
- Secrets
- Passwords
- Private tokens

**Safe to include:**
- Public API URLs
- Feature flags
- Public configuration values

## Verifying Configuration

### Check if environment variables are loaded:

```javascript
// Add this temporarily to App.js
console.log('API URL:', process.env.REACT_APP_API_URL);
```

### Test API connection:

1. Start the backend server
2. Start the React app
3. Open browser console
4. Check for API connection errors

## Production Deployment

### Vercel

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api`

### Netlify

1. Go to Site Settings → Build & Deploy → Environment
2. Add environment variable:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.com/api
   ```

### Heroku

```bash
# Set environment variable
heroku config:set REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

### Custom Server

Build with environment variable:

```bash
# Linux/macOS
REACT_APP_API_URL=https://api.yourapp.com/api npm run build

# Windows (PowerShell)
$env:REACT_APP_API_URL="https://api.yourapp.com/api"; npm run build

# Windows (CMD)
set REACT_APP_API_URL=https://api.yourapp.com/api && npm run build
```

## Troubleshooting

### Issue: Environment variable is undefined

**Solutions:**
1. Ensure variable starts with `REACT_APP_`
2. Restart the development server
3. Check `.env` file location (must be in project root)
4. Verify no typos in variable name

### Issue: CORS errors

**Problem:** API URL is correct but requests are blocked

**Solution:**
1. Ensure backend has CORS enabled
2. Check if backend is running
3. Verify backend URL is accessible
4. Check browser console for exact error

### Issue: Changes to .env not reflecting

**Solution:**
```bash
# Stop the server (Ctrl+C)
# Clear cache (optional)
rm -rf node_modules/.cache

# Restart
npm start
```

### Issue: Different URL for different developers

**Solution:**
Create `.env.local` (ignored by git):
```env
# Developer 1
REACT_APP_API_URL=http://localhost:5000/api

# Developer 2 (different port)
REACT_APP_API_URL=http://localhost:5001/api
```

## Advanced Configuration

### Feature Flags

```env
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_BETA_FEATURES=false
```

```javascript
// Usage
const enableAnalytics = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';
```

### Multiple APIs

```env
REACT_APP_PRIMARY_API=http://localhost:5000/api
REACT_APP_ANALYTICS_API=http://localhost:6000/api
```

## Quick Reference

| Environment | File | Usage |
|-------------|------|-------|
| All | `.env` | Default values |
| Local Dev | `.env.local` | Local overrides (gitignored) |
| Development | `.env.development` | Dev-specific values |
| Production | `.env.production` | Prod-specific values |

**Remember:** Always restart the server after changing environment variables! 🔄

