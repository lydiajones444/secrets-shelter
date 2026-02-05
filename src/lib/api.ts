// API Base URL - Uses Render backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://devsolutions-backend.onrender.com/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Contact Form API - Uses Render Django Backend
export const submitContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return apiCall('/contact/submit/', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    }),
  });
};

// Newsletter API - Uses Render Django Backend
export const subscribeNewsletter = async (email: string) => {
  return apiCall('/newsletter/subscribe/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

// Project Inquiry API - Uses Render Django Backend
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
  return apiCall('/project-inquiry/submit/', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      project_type: data.project_type,
      budget_range: data.budget_range || null,
      description: data.description,
      timeline: data.timeline || null,
    }),
  });
};

// Portfolio API - Uses Render Django Backend
export const getPortfolioProjects = async (featured?: boolean, category?: string) => {
  const params = new URLSearchParams();
  if (featured !== undefined) params.append('featured', featured.toString());
  if (category) params.append('category', category);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/portfolio/?${queryString}` : '/portfolio/';
  
  return apiCall(endpoint);
};

export const getPortfolioProject = async (id: number) => {
  return apiCall(`/portfolio/${id}/`);
};

// Testimonials API - Uses Render Django Backend
export const getTestimonials = async (featured?: boolean) => {
  const endpoint = featured !== undefined 
    ? `/testimonials/?featured=${featured}` 
    : '/testimonials/';
  
  return apiCall(endpoint);
};

// Stats API - Uses Render Django Backend
export const getStats = async () => {
  return apiCall('/stats/');
};
