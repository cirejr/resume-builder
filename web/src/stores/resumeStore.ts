import { create } from 'zustand'

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: Array<string>
  url?: string
}

export interface ResumeData {
  personal: PersonalInfo
  summary: string
  experience: Array<Experience>
  education: Array<Education>
  skills: Array<string>
  projects: Array<Project>
}

export type TemplateType = 'minimal-professional' | 'tech-dev'

interface ResumeState {
  resumeId: string | null
  resumeTitle: string
  data: ResumeData
  selectedTemplate: TemplateType
  isDirty: boolean
  isLoading: boolean
  error: string | null
}

interface ResumeActions {
  setPersonalInfo: (info: PersonalInfo) => void
  setSummary: (summary: string) => void
  setExperience: (experience: Array<Experience>) => void
  setEducation: (education: Array<Education>) => void
  setSkills: (skills: Array<string>) => void
  setProjects: (projects: Array<Project>) => void
  setTemplate: (template: TemplateType) => void
  setResumeId: (id: string | null) => void
  setResumeTitle: (title: string) => void
  loadResume: (id: string, title: string, data: ResumeData) => void
  resetResume: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  markDirty: () => void
  markClean: () => void
}

const defaultPersonalInfo: PersonalInfo = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
}

const defaultResumeData: ResumeData = {
  personal: defaultPersonalInfo,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

export const useResumeStore = create<ResumeState & ResumeActions>((set) => ({
  resumeId: null,
  resumeTitle: 'Untitled Resume',
  data: defaultResumeData,
  selectedTemplate: 'minimal-professional',
  isDirty: false,
  isLoading: false,
  error: null,

  setPersonalInfo: (info) =>
    set((state) => ({
      data: { ...state.data, personal: info },
      isDirty: true,
    })),

  setSummary: (summary) =>
    set((state) => ({
      data: { ...state.data, summary },
      isDirty: true,
    })),

  setExperience: (experience) =>
    set((state) => ({
      data: { ...state.data, experience },
      isDirty: true,
    })),

  setEducation: (education) =>
    set((state) => ({
      data: { ...state.data, education },
      isDirty: true,
    })),

  setSkills: (skills) =>
    set((state) => ({
      data: { ...state.data, skills },
      isDirty: true,
    })),

  setProjects: (projects) =>
    set((state) => ({
      data: { ...state.data, projects },
      isDirty: true,
    })),

  setTemplate: (template) => set({ selectedTemplate: template }),

  setResumeId: (id) => set({ resumeId: id }),

  setResumeTitle: (title) => set({ resumeTitle: title, isDirty: true }),

  loadResume: (id, title, data) =>
    set({
      resumeId: id,
      resumeTitle: title,
      data,
      isDirty: false,
      error: null,
    }),

  resetResume: () =>
    set({
      resumeId: null,
      resumeTitle: 'Untitled Resume',
      data: defaultResumeData,
      isDirty: false,
      error: null,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  markDirty: () => set({ isDirty: true }),

  markClean: () => set({ isDirty: false }),
}))
