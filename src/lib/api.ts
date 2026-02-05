// API Base URL - Uses Render backend with HTTPS
// Render automatically provides HTTPS for all services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://devsolutions-backend.onrender.com/api';

// Ensure URL uses HTTPS in production (Render requirement)
function getApiBaseUrl(): string {
  const url = API_BASE_URL;
  // Force HTTPS in production (when not localhost)
  if (typeof window !== 'undefined' && !url.includes('localhost') && !url.includes('127.0.0.1')) {
    return url.replace(/^http:/, 'https:');
  }
  return url;
}

// Helper function to handle API responses with HTTPS enforcement
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error occurred' }));
    throw new Error(error.message || error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Contact Form API
export const submitContact = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/contact/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// Newsletter API
export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// Project Inquiry API
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
  try {
    const response = await fetch(`${API_BASE_URL}/project-inquiry/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// Portfolio API
export const getPortfolioProjects = async (featured?: boolean, category?: string) => {
  try {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (category) params.append('category', category);
    
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/portfolio/${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (error: any) {
    // Return empty array if backend is not available
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.warn('Backend not available, returning empty portfolio');
      return [];
    }
    throw error;
  }
};

export const getPortfolioProject = async (id: number) => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/portfolio/${id}/`);
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please check your internet connection.');
    }
    throw error;
  }
};

// Testimonials API
export const getTestimonials = async (featured?: boolean) => {
  try {
    const baseUrl = getApiBaseUrl();
    const url = featured 
      ? `${baseUrl}/testimonials/?featured=true`
      : `${baseUrl}/testimonials/`;
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (error: any) {
    // Return empty array if backend is not available
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.warn('Backend not available, returning empty testimonials');
      return [];
    }
    throw error;
  }
};

// Stats API
export const getStats = async () => {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/stats/`);
    return await handleResponse(response);
  } catch (error: any) {
    // Return default stats if backend is not available
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.warn('Backend not available, returning default stats');
      return { total_projects: 0, total_testimonials: 0, total_subscriptions: 0 };
    }
    throw error;
  }
};
