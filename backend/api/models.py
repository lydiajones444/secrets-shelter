from django.db import models
from django.utils import timezone


class ContactSubmission(models.Model):
    """Model for contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'

    def __str__(self):
        return f"Contact from {self.name} - {self.email}"


class NewsletterSubscription(models.Model):
    """Model for newsletter subscriptions"""
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-subscribed_at']
        verbose_name = 'Newsletter Subscription'
        verbose_name_plural = 'Newsletter Subscriptions'

    def __str__(self):
        return self.email


class ProjectInquiry(models.Model):
    """Model for project inquiry/quote requests"""
    PROJECT_TYPES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile App Development'),
        ('custom', 'Custom Software'),
        ('cloud', 'Cloud Solutions'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    company = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPES)
    budget_range = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    timeline = models.CharField(max_length=100, blank=True, null=True)
    submitted_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=20,
        choices=[
            ('new', 'New'),
            ('contacted', 'Contacted'),
            ('quoted', 'Quoted'),
            ('closed', 'Closed'),
        ],
        default='new'
    )

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Project Inquiry'
        verbose_name_plural = 'Project Inquiries'

    def __str__(self):
        return f"Project Inquiry from {self.name} - {self.project_type}"


class PortfolioProject(models.Model):
    """Model for portfolio projects"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    technologies = models.CharField(max_length=500, help_text="Comma-separated list of technologies")
    project_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    category = models.CharField(
        max_length=50,
        choices=[
            ('web', 'Web Development'),
            ('mobile', 'Mobile App'),
            ('fullstack', 'Full Stack'),
            ('other', 'Other'),
        ]
    )
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Portfolio Project'
        verbose_name_plural = 'Portfolio Projects'

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Model for client testimonials"""
    client_name = models.CharField(max_length=200)
    client_position = models.CharField(max_length=200, blank=True, null=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    testimonial = models.TextField()
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 6)],
        default=5
    )
    image_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f"Testimonial from {self.client_name}"
