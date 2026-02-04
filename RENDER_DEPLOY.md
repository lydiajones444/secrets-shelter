# Quick Deploy to Render Guide

## 🚀 Quick Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy Using Render Dashboard

#### Option A: Manual Setup (Step by Step)

**Backend:**
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo
4. Settings:
   - Name: `devsolutions-backend`
   - Environment: `Python 3`
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput`
   - Start: `gunicorn devsolutions.wsgi:application --bind 0.0.0.0:$PORT`
5. Add Environment Variables:
   - `SECRET_KEY`: Generate one (run: `python -c "import secrets; print(secrets.token_urlsafe(50))"`)
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `devsolutions-backend.onrender.com`
6. Create PostgreSQL database first, then add:
   - `DATABASE_URL`: (auto-filled from database)
7. Deploy!

**Frontend:**
1. Click **"New +"** → **"Web Service"**
2. Connect same GitHub repo
3. Settings:
   - Name: `devsolutions-frontend`
   - Environment: `Node`
   - Build: `npm install && npm run build`
   - Start: `npm run preview`
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://devsolutions-backend.onrender.com/api`
5. Deploy!

#### Option B: Using Blueprint (Easier!)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` and create everything
5. After deployment, update:
   - Frontend env var: `VITE_API_BASE_URL` = your backend URL
   - Backend env var: `CORS_ALLOWED_ORIGINS` = your frontend URL

### 3. Create Admin User

After backend deploys:
1. Go to backend service → **Shell** tab
2. Run: `python manage.py createsuperuser`
3. Follow prompts

### 4. Access Your Site

- Frontend: `https://devsolutions-frontend.onrender.com`
- Backend API: `https://devsolutions-backend.onrender.com/api/`
- Admin: `https://devsolutions-backend.onrender.com/admin/`

## 📝 Important Environment Variables

**Backend:**
- `SECRET_KEY` - Django secret key (generate a secure one)
- `DEBUG` - Set to `False` for production
- `ALLOWED_HOSTS` - Your backend domain
- `DATABASE_URL` - Auto-set from PostgreSQL database
- `CORS_ALLOWED_ORIGINS` - Your frontend URL (update after frontend deploys)

**Frontend:**
- `VITE_API_BASE_URL` - Your backend API URL (e.g., `https://devsolutions-backend.onrender.com/api`)

## ⚠️ Notes

- Free tier services spin down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- Database persists data even when services are down
- Update CORS settings after both services are deployed

## 🔧 Troubleshooting

**Backend won't start?**
- Check build logs
- Verify DATABASE_URL is set
- Ensure SECRET_KEY is set

**Frontend can't connect?**
- Check VITE_API_BASE_URL is correct
- Verify CORS_ALLOWED_ORIGINS includes frontend URL
- Ensure backend URL ends with `/api`
