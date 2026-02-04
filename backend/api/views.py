from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.utils import timezone
from .models import (
    ContactSubmission,
    NewsletterSubscription,
    ProjectInquiry,
    PortfolioProject,
    Testimonial,
)
from .serializers import (
    ContactSubmissionSerializer,
    ContactSubmissionCreateSerializer,
    NewsletterSubscriptionSerializer,
    NewsletterSubscriptionCreateSerializer,
    ProjectInquirySerializer,
    ProjectInquiryCreateSerializer,
    PortfolioProjectSerializer,
    TestimonialSerializer,
)


@api_view(['POST'])
def contact_submit(request):
    """Submit a contact form"""
    serializer = ContactSubmissionCreateSerializer(data=request.data)
    if serializer.is_valid():
        contact = ContactSubmission.objects.create(**serializer.validated_data)
        return Response(
            {
                'message': 'Thank you for your message! We will get back to you soon.',
                'id': contact.id
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def contact_list(request):
    """Get all contact submissions (for admin)"""
    contacts = ContactSubmission.objects.all()
    serializer = ContactSubmissionSerializer(contacts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def newsletter_subscribe(request):
    """Subscribe to newsletter"""
    serializer = NewsletterSubscriptionCreateSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        subscription, created = NewsletterSubscription.objects.get_or_create(
            email=email,
            defaults={'is_active': True}
        )
        if not created:
            if not subscription.is_active:
                subscription.is_active = True
                subscription.save()
            return Response(
                {'message': 'You are already subscribed to our newsletter!'},
                status=status.HTTP_200_OK
            )
        return Response(
            {'message': 'Successfully subscribed to newsletter!'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def newsletter_unsubscribe(request):
    """Unsubscribe from newsletter"""
    email = request.data.get('email')
    if not email:
        return Response(
            {'error': 'Email is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        subscription = NewsletterSubscription.objects.get(email=email)
        subscription.is_active = False
        subscription.save()
        return Response(
            {'message': 'Successfully unsubscribed from newsletter'},
            status=status.HTTP_200_OK
        )
    except NewsletterSubscription.DoesNotExist:
        return Response(
            {'error': 'Email not found in our subscription list'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
def project_inquiry_submit(request):
    """Submit a project inquiry/quote request"""
    serializer = ProjectInquiryCreateSerializer(data=request.data)
    if serializer.is_valid():
        inquiry = ProjectInquiry.objects.create(**serializer.validated_data)
        return Response(
            {
                'message': 'Thank you for your inquiry! We will review it and get back to you soon.',
                'id': inquiry.id
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def project_inquiry_list(request):
    """Get all project inquiries (for admin)"""
    inquiries = ProjectInquiry.objects.all()
    serializer = ProjectInquirySerializer(inquiries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def portfolio_projects(request):
    """Get all portfolio projects"""
    featured_only = request.query_params.get('featured', '').lower() == 'true'
    category = request.query_params.get('category', None)

    projects = PortfolioProject.objects.all()

    if featured_only:
        projects = projects.filter(featured=True)
    if category:
        projects = projects.filter(category=category)

    serializer = PortfolioProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def portfolio_project_detail(request, pk):
    """Get a specific portfolio project"""
    try:
        project = PortfolioProject.objects.get(pk=pk)
        serializer = PortfolioProjectSerializer(project)
        return Response(serializer.data)
    except PortfolioProject.DoesNotExist:
        return Response(
            {'error': 'Project not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
def testimonials(request):
    """Get all testimonials"""
    featured_only = request.query_params.get('featured', '').lower() == 'true'

    testimonials = Testimonial.objects.all()
    if featured_only:
        testimonials = testimonials.filter(featured=True)

    serializer = TestimonialSerializer(testimonials, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def newsletter_list(request):
    """Get all newsletter subscriptions (for admin)"""
    subscriptions = NewsletterSubscription.objects.all().order_by('-subscribed_at')
    serializer = NewsletterSubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def admin_dashboard(request):
    """Get all submitted data in one place (for admin viewing)"""
    dashboard_data = {
        'contact_submissions': ContactSubmissionSerializer(
            ContactSubmission.objects.all().order_by('-submitted_at'), 
            many=True
        ).data,
        'project_inquiries': ProjectInquirySerializer(
            ProjectInquiry.objects.all().order_by('-submitted_at'), 
            many=True
        ).data,
        'newsletter_subscriptions': NewsletterSubscriptionSerializer(
            NewsletterSubscription.objects.all().order_by('-subscribed_at'), 
            many=True
        ).data,
        'stats': {
            'total_contacts': ContactSubmission.objects.count(),
            'total_inquiries': ProjectInquiry.objects.count(),
            'total_subscriptions': NewsletterSubscription.objects.count(),
            'active_subscriptions': NewsletterSubscription.objects.filter(is_active=True).count(),
        }
    }
    return Response(dashboard_data)


@api_view(['GET'])
def stats(request):
    """Get website statistics"""
    stats_data = {
        'total_projects': PortfolioProject.objects.count(),
        'featured_projects': PortfolioProject.objects.filter(featured=True).count(),
        'total_testimonials': Testimonial.objects.count(),
        'featured_testimonials': Testimonial.objects.filter(featured=True).count(),
        'total_subscriptions': NewsletterSubscription.objects.filter(is_active=True).count(),
    }
    return Response(stats_data)
