import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'devsolutions.settings')
django.setup()

from django.contrib.auth.models import User

# Get credentials from environment variables (for production) or use defaults (for local dev)
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@devsolutions.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"✅ Superuser created successfully!")
    print(f"Username: {username}")
    print(f"Email: {email}")
    if os.environ.get('DJANGO_SUPERUSER_PASSWORD'):
        print("⚠️  Password was set from environment variable")
    else:
        print(f"Password: {password} (⚠️  Change this in production!)")
    sys.exit(0)
else:
    print(f"ℹ️  Superuser '{username}' already exists!")
    sys.exit(0)
