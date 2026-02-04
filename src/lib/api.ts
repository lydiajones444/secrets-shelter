const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Helper function to handle API responses
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
    const response = await fetch(`${API_BASE_URL}/contact/submit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://127.0.0.1:8000');
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
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://127.0.0.1:8000');
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
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://127.0.0.1:8000');
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
    
    const url = `${API_BASE_URL}/portfolio/${params.toString() ? '?' + params.toString() : ''}`;
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
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}/`);
    return await handleResponse(response);
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://127.0.0.1:8000');
    }
    throw error;
  }
};

// Testimonials API
export const getTestimonials = async (featured?: boolean) => {
  try {
    const url = featured 
      ? `${API_BASE_URL}/testimonials/?featured=true`
      : `${API_BASE_URL}/testimonials/`;
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
    const response = await fetch(`${API_BASE_URL}/stats/`);
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
