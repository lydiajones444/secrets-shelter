# Deployment Guide for Render

This guide will help you deploy both the frontend and backend to Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at https://render.com)
3. Your code pushed to a GitHub repository

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy Backend (Django API)

### Option A: Using Render Dashboard

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `devsolutions-backend`
   - **Environment**: `Python 3`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput
     ```
   - **Start Command**: 
     ```bash
     gunicorn devsolutions.wsgi:application --bind 0.0.0.0:$PORT
     ```

5. **Add Environment Variables**:
   - `SECRET_KEY`: Generate a random secret key (you can use: `python -c "import secrets; print(secrets.token_urlsafe(50))"`)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `devsolutions-backend.onrender.com` (or your custom domain)
   - `DATABASE_URL`: (Will be auto-set if you create a PostgreSQL database)
   - `CORS_ALLOWED_ORIGINS`: `https://devsolutions-frontend.onrender.com` (update after frontend is deployed)

6. **Create PostgreSQL Database**:
   - Click **"New +"** → **"PostgreSQL"**
   - Name: `devsolutions-db`
   - Plan: Free
   - Copy the **Internal Database URL** and add it as `DATABASE_URL` environment variable

7. Click **"Create Web Service"**

### Option B: Using render.yaml (Recommended)

1. The `render.yaml` file is already created in the root directory
2. Go to Render Dashboard → **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create all services

## Step 3: Deploy Frontend (React/Vite)

1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `devsolutions-frontend`
   - **Environment**: `Node`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: (leave empty - root)
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm run preview -- --host 0.0.0.0 --port $PORT
     ```

5. **Add Environment Variables**:
   - `NODE_VERSION`: `18.17.0`
   - `VITE_API_BASE_URL`: `https://devsolutions-backend.onrender.com/api` (use your backend URL)

6. Click **"Create Web Service"**

## Step 4: Update CORS Settings

After both services are deployed:

1. Go to your **Backend Service** on Render
2. Go to **Environment** tab
3. Update `CORS_ALLOWED_ORIGINS` to include your frontend URL:
   ```
   https://devsolutions-frontend.onrender.com
   ```
4. Save changes (this will trigger a redeploy)

## Step 5: Create Admin User

After backend is deployed, create a superuser:

1. Go to your backend service on Render
2. Click **"Shell"** tab
3. Run:
   ```bash
   python manage.py createsuperuser
   ```
4. Follow the prompts to create admin credentials

## Step 6: Access Your Deployed App

- **Frontend**: `https://devsolutions-frontend.onrender.com`
- **Backend API**: `https://devsolutions-backend.onrender.com/api/`
- **Admin Panel**: `https://devsolutions-backend.onrender.com/admin/`

## Important Notes

1. **Free Tier Limitations**:
   - Services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading to paid plan for production

2. **Database**:
   - Free PostgreSQL database has 1GB storage limit
   - Data persists even when services spin down

3. **Environment Variables**:
   - Keep `SECRET_KEY` secret and never commit it to Git
   - Update `CORS_ALLOWED_ORIGINS` after deployment
   - Update `ALLOWED_HOSTS` if using custom domain

4. **Custom Domain**:
   - You can add custom domains in Render dashboard
   - Update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` accordingly

## Troubleshooting

### Backend won't start
- Check build logs for errors
- Verify all environment variables are set
- Ensure database is created and `DATABASE_URL` is set

### Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` is set correctly
- Check CORS settings in backend
- Ensure backend URL includes `/api` at the end

### Database errors
- Run migrations: `python manage.py migrate`
- Check database connection string
- Verify database is running

## Manual Deployment Commands

If you need to run commands manually:

```bash
# In Render Shell for backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## Support

For Render-specific issues, check:
- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
