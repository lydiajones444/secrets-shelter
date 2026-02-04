import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Shield,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Star,
  ExternalLink,
  Github,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  submitContact,
  subscribeNewsletter,
  submitProjectInquiry,
  getPortfolioProjects,
  getTestimonials,
  getStats,
} from "@/lib/api";

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total_projects: 0, total_testimonials: 0, total_subscriptions: 0 });
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Project inquiry form state
  const [projectForm, setProjectForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project_type: "",
    budget_range: "",
    description: "",
    timeline: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load stats
      const statsData = await getStats();
      setStats(statsData);

      // Load featured portfolio projects
      const projects = await getPortfolioProjects(true);
      setPortfolioProjects(projects);

      // Load featured testimonials
      const testimonialsData = await getTestimonials(true);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitContact(contactForm);
      toast({
        title: "Message Sent!",
        description: result.message || "Thank you for your message. We'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeNewsletter(newsletterEmail);
      toast({
        title: "Subscribed!",
        description: result.message || "Successfully subscribed to our newsletter!",
      });
      setNewsletterEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || error.error || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProjectInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitProjectInquiry(projectForm);
      toast({
        title: "Inquiry Submitted!",
        description: result.message || "Thank you for your inquiry. We'll review it and get back to you soon.",
      });
      setProjectForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        project_type: "",
        budget_range: "",
        description: "",
        timeline: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom Software Development",
      description: "Tailored solutions built to meet your unique business requirements with cutting-edge technology.",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development",
      description: "Responsive, scalable, and high-performance web applications using modern frameworks and best practices.",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backend Development",
      description: "Robust server-side solutions, APIs, and database architectures that power your applications.",
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Solutions",
      description: "Cloud migration, infrastructure setup, and DevOps services to scale your business efficiently.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Maintenance",
      description: "Comprehensive security audits, updates, and ongoing maintenance to keep your systems secure.",
    },
  ];

  const features = [
    "Agile Development Methodology",
    "24/7 Support & Maintenance",
    "Scalable Architecture",
    "Code Quality Assurance",
    "Fast Delivery Times",
    "Competitive Pricing",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevSolutions</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm hover:text-primary transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-sm hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#features" className="text-sm hover:text-primary transition-colors">
                Features
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </a>
            </div>
            <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              Professional Software Development Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Ideas Into
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}
                Powerful Software
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We deliver cutting-edge software solutions that drive business growth. From web and mobile apps to cloud
              infrastructure, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Our Work
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{stats.total_subscriptions || 500}+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>{stats.total_projects || 1000}+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>99% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-primary/5 border-y">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email for updates"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Software Development Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a full spectrum of software development services to help your business thrive in the digital age.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {portfolioProjects.length > 0 && (
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">
                Our Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore some of our recent work and see how we've helped businesses succeed.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {project.image_url && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.technologies_list && project.technologies_list.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies_list.slice(0, 3).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {project.project_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="secondary">
                Client Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.testimonial}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {testimonial.image_url && (
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.client_name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.client_name}</p>
                        {testimonial.client_position && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.client_position}
                            {testimonial.company && ` at ${testimonial.company}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Excellence in Every Line of Code
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We combine technical expertise with business acumen to deliver software solutions that not only work
                flawlessly but also drive real business value.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Expert Team</h3>
                      <p className="text-sm text-muted-foreground">Senior developers with 10+ years experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Fast Delivery</h3>
                      <p className="text-sm text-muted-foreground">Agile methodology for rapid iterations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure & Reliable</h3>
                      <p className="text-sm text-muted-foreground">Enterprise-grade security standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-primary-foreground/90">
              Let's discuss your project and turn your vision into reality. Get a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Schedule a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              Get In Touch
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Start a Conversation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Project Inquiry Form */}
            <Card>
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <CardDescription>Tell us about your project and we'll provide a quote</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inq-name">Name *</Label>
                      <Input
                        id="inq-name"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inq-email">Email *</Label>
                      <Input
                        id="inq-email"
                        type="email"
                        value={projectForm.email}
                        onChange={(e) => setProjectForm({ ...projectForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inq-company">Company</Label>
                      <Input
                        id="inq-company"
                        value={projectForm.company}
                        onChange={(e) => setProjectForm({ ...projectForm, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inq-phone">Phone</Label>
                      <Input
                        id="inq-phone"
                        type="tel"
                        value={projectForm.phone}
                        onChange={(e) => setProjectForm({ ...projectForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type *</Label>
                    <Select
                      value={projectForm.project_type}
                      onValueChange={(value) => setProjectForm({ ...projectForm, project_type: value })}
                      required
                    >
                      <SelectTrigger id="project-type">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile App Development</SelectItem>
                        <SelectItem value="custom">Custom Software</SelectItem>
                        <SelectItem value="cloud">Cloud Solutions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      value={projectForm.budget_range}
                      onChange={(e) => setProjectForm({ ...projectForm, budget_range: e.target.value })}
                      placeholder="e.g., $10,000 - $50,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      value={projectForm.timeline}
                      onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })}
                      placeholder="e.g., 3-6 months"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Request Quote"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>hello@devsolutions.com</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>+1 (555) 123-4567</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle>Visit Us</CardTitle>
                <CardDescription>123 Tech Street, San Francisco, CA</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DevSolutions</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building exceptional software solutions for businesses worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Cloud Solutions
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 DevSolutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
