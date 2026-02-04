#!/usr/bin/env bash
# Exit on error
set -o errexit

# Run migrations
python manage.py migrate --noinput

# Start Gunicorn
gunicorn devsolutions.wsgi:application --bind 0.0.0.0:$PORT
