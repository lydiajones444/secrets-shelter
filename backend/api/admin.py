from django.contrib import admin
from .models import (
    ContactSubmission,
    NewsletterSubscription,
    ProjectInquiry,
    PortfolioProject,
    Testimonial,
)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'submitted_at', 'is_read']
    list_filter = ['is_read', 'submitted_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['submitted_at']
    date_hierarchy = 'submitted_at'


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'is_active']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']


@admin.register(ProjectInquiry)
class ProjectInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'project_type', 'status', 'submitted_at']
    list_filter = ['project_type', 'status', 'submitted_at']
    search_fields = ['name', 'email', 'company', 'description']
    readonly_fields = ['submitted_at']
    date_hierarchy = 'submitted_at'


@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'created_at']
    list_filter = ['category', 'featured', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    readonly_fields = ['created_at']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company', 'rating', 'featured', 'created_at']
    list_filter = ['rating', 'featured', 'created_at']
    search_fields = ['client_name', 'company', 'testimonial']
    readonly_fields = ['created_at']
