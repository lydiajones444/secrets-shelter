-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_inquiries table
CREATE TABLE public.project_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT,
  description TEXT NOT NULL,
  timeline TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Public insert policies (anyone can submit forms)
CREATE POLICY "Allow public insert on contact_submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert on newsletter_subscriptions"
  ON public.newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert on project_inquiries"
  ON public.project_inquiries FOR INSERT
  WITH CHECK (true);

-- Public select for newsletter (to check if already subscribed)
CREATE POLICY "Allow public select on newsletter_subscriptions"
  ON public.newsletter_subscriptions FOR SELECT
  USING (true);

-- Allow update for newsletter unsubscribe
CREATE POLICY "Allow public update on newsletter_subscriptions"
  ON public.newsletter_subscriptions FOR UPDATE
  USING (true);