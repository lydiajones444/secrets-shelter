from rest_framework import serializers
from .models import (
    ContactSubmission,
    NewsletterSubscription,
    ProjectInquiry,
    PortfolioProject,
    Testimonial,
)


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'name', 'email', 'phone', 'message', 'submitted_at']
        read_only_fields = ['id', 'submitted_at']


class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'message']


class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['id', 'subscribed_at', 'is_active']


class NewsletterSubscriptionCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ProjectInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInquiry
        fields = [
            'id', 'name', 'email', 'company', 'phone',
            'project_type', 'budget_range', 'description',
            'timeline', 'submitted_at', 'status'
        ]
        read_only_fields = ['id', 'submitted_at', 'status']


class ProjectInquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInquiry
        fields = [
            'name', 'email', 'company', 'phone',
            'project_type', 'budget_range', 'description', 'timeline'
        ]


class PortfolioProjectSerializer(serializers.ModelSerializer):
    technologies_list = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioProject
        fields = [
            'id', 'title', 'description', 'image_url',
            'technologies', 'technologies_list', 'project_url',
            'github_url', 'category', 'featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_technologies_list(self, obj):
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',')]
        return []


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_position', 'company',
            'testimonial', 'rating', 'image_url', 'featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
