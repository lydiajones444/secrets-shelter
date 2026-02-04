from django.urls import path
from . import views

urlpatterns = [
    # Contact form endpoints
    path('contact/submit/', views.contact_submit, name='contact_submit'),
    path('contact/list/', views.contact_list, name='contact_list'),

    # Newsletter endpoints
    path('newsletter/subscribe/', views.newsletter_subscribe, name='newsletter_subscribe'),
    path('newsletter/unsubscribe/', views.newsletter_unsubscribe, name='newsletter_unsubscribe'),

    # Project inquiry endpoints
    path('project-inquiry/submit/', views.project_inquiry_submit, name='project_inquiry_submit'),
    path('project-inquiry/list/', views.project_inquiry_list, name='project_inquiry_list'),

    # Portfolio endpoints
    path('portfolio/', views.portfolio_projects, name='portfolio_projects'),
    path('portfolio/<int:pk>/', views.portfolio_project_detail, name='portfolio_project_detail'),

    # Testimonials endpoints
    path('testimonials/', views.testimonials, name='testimonials'),

    # Stats endpoint
    path('stats/', views.stats, name='stats'),
]
