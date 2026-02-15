import type { ResumeData, TemplateType } from '@/stores/resumeStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export interface Resume {
  id: string
  title: string
  data: ResumeData
  createdAt: string
  updatedAt: string
  slug: string
  isPublic: boolean
}

// Helper to get auth token - will be called before each request
let getToken: () => Promise<string | null> = async () => null

export function setAuthTokenGetter(fn: () => Promise<string | null>) {
  getToken = fn
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getToken()
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP ${response.status}`)
  }

  return response
}

export const resumeApi = {
  async getAll(): Promise<Array<Resume>> {
    const response = await fetchWithAuth(`${API_BASE_URL}/resumes`)
    return response.json()
  },

  async getById(id: string): Promise<Resume> {
    const response = await fetchWithAuth(`${API_BASE_URL}/resumes?id=${id}`)
    return response.json()
  },

  async create(title: string, data: ResumeData, templateId?: string): Promise<{ id: string; slug: string }> {
    const response = await fetchWithAuth(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      body: JSON.stringify({ title, data, templateId }),
    })
    return response.json()
  },

  async update(id: string, title: string, data: ResumeData): Promise<void> {
    await fetchWithAuth(`${API_BASE_URL}/resumes?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, data }),
    })
  },

  async delete(id: string): Promise<void> {
    await fetchWithAuth(`${API_BASE_URL}/resumes?id=${id}`, {
      method: 'DELETE',
    })
  },

  async export(data: ResumeData, template: TemplateType): Promise<Blob> {
    const response = await fetchWithAuth(`${API_BASE_URL}/export`, {
      method: 'POST',
      body: JSON.stringify({ data, template }),
    })
    return response.blob()
  },

  async getPublicResume(slug: string): Promise<Pick<Resume, 'title' | 'data' | 'templateId' | 'updatedAt'>> {
    const response = await fetch(`${API_BASE_URL}/public/resume?slug=${slug}`)
    if (!response.ok) throw new Error('Resume not found')
    return response.json()
  },

  async health(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) throw new Error('API health check failed')
    return response.json()
  },
}
