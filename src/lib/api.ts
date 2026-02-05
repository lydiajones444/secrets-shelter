import { supabase } from "@/integrations/supabase/client";

// Contact Form API - Uses Lovable Cloud
export const submitContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  const { error } = await supabase
    .from("contact_submissions")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    });

  if (error) throw new Error(error.message);
  
  return { message: "Thank you for your message! We will get back to you soon." };
};

// Newsletter API - Uses Lovable Cloud
export const subscribeNewsletter = async (email: string) => {
  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscriptions")
    .select("id, is_active")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    if (existing.is_active) {
      return { message: "You are already subscribed to our newsletter!" };
    }
    // Reactivate subscription
    const { error } = await supabase
      .from("newsletter_subscriptions")
      .update({ is_active: true })
      .eq("id", existing.id);

    if (error) throw new Error(error.message);
    return { message: "Successfully re-subscribed to newsletter!" };
  }

  // New subscription
  const { error } = await supabase
    .from("newsletter_subscriptions")
    .insert({ email, is_active: true });

  if (error) {
    if (error.code === "23505") {
      return { message: "You are already subscribed to our newsletter!" };
    }
    throw new Error(error.message);
  }
  
  return { message: "Successfully subscribed to newsletter!" };
};

// Project Inquiry API - Uses Lovable Cloud
export const submitProjectInquiry = async (data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  project_type: string;
  budget_range?: string;
  description: string;
  timeline?: string;
}) => {
  const { error } = await supabase
    .from("project_inquiries")
    .insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      project_type: data.project_type,
      budget_range: data.budget_range || null,
      description: data.description,
      timeline: data.timeline || null,
    });

  if (error) throw new Error(error.message);
  
  return { message: "Thank you for your inquiry! We will review it and get back to you soon." };
};

// Portfolio API - Returns static data (no backend needed)
export const getPortfolioProjects = async (featured?: boolean, category?: string) => {
  // Return empty array - portfolio is managed elsewhere
  return [];
};

export const getPortfolioProject = async (id: number) => {
  return null;
};

// Testimonials API - Returns static data
export const getTestimonials = async (featured?: boolean) => {
  return [];
};

// Stats API - Returns default stats
export const getStats = async () => {
  return { total_projects: 50, total_testimonials: 25, total_subscriptions: 500 };
};
