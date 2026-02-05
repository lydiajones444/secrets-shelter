// API Base URL - Uses Render backend with HTTPS
// Render automatically provides HTTPS for all services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://devsolutions-backend.onrender.com/api';

// Ensure URL uses HTTPS in production
function getApiBaseUrl(): string {
  const url = API_BASE_URL;
  // Force HTTPS in production (when not localhost)
  if (typeof window !== 'undefined' && !url.includes('localhost') && !url.includes('127.0.0.1')) {
    return url.replace(/^http:/, 'https:');
  }
  return url;
}

// Helper function for API calls with HTTPS enforcement
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  // Ensure HTTPS in production
  if (url.startsWith('http://') && !url.includes('localhost') && !url.includes('127.0.0.1')) {
    console.warn('API call using HTTP instead of HTTPS. This may be insecure in production.');
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      // Ensure credentials are handled securely
      credentials: 'omit', // Don't send cookies cross-origin unless needed
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
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
