# DevSolutions Backend API

Django REST API backend for the DevSolutions landing page.

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Optional - for admin panel)

```bash
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Contact Form
- `POST /api/contact/submit/` - Submit contact form
- `GET /api/contact/list/` - Get all contact submissions (admin)

### Newsletter
- `POST /api/newsletter/subscribe/` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe/` - Unsubscribe from newsletter

### Project Inquiries
- `POST /api/project-inquiry/submit/` - Submit project inquiry/quote request
- `GET /api/project-inquiry/list/` - Get all inquiries (admin)

### Portfolio
- `GET /api/portfolio/` - Get all portfolio projects
  - Query params: `?featured=true` - Get only featured projects
  - Query params: `?category=web` - Filter by category
- `GET /api/portfolio/<id>/` - Get specific project

### Testimonials
- `GET /api/testimonials/` - Get all testimonials
  - Query params: `?featured=true` - Get only featured testimonials

### Statistics
- `GET /api/stats/` - Get website statistics

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`

Login with the superuser credentials created in step 4.

## Example API Requests

### Submit Contact Form
```bash
POST http://localhost:8000/api/contact/submit/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your services"
}
```

### Subscribe to Newsletter
```bash
POST http://localhost:8000/api/newsletter/subscribe/
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Submit Project Inquiry
```bash
POST http://localhost:8000/api/project-inquiry/submit/
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Tech Corp",
  "phone": "+1234567890",
  "project_type": "web",
  "budget_range": "$10,000 - $50,000",
  "description": "I need a custom web application",
  "timeline": "3-6 months"
}
```

## Database

The project uses SQLite by default. The database file will be created at `backend/db.sqlite3` after running migrations.

For production, update the database settings in `devsolutions/settings.py` to use PostgreSQL or MySQL.
