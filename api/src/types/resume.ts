import { z } from 'zod'

export const PersonalInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
})

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
})

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  gpa: z.string().optional(),
})

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string().url().optional(),
})

export const ResumeDataSchema = z.object({
  personal: PersonalInfoSchema,
  summary: z.string(),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema).optional(),
})

export const CreateResumeSchema = z.object({
  title: z.string().min(1),
  data: ResumeDataSchema,
  templateId: z.string().optional(),
})

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Education = z.infer<typeof EducationSchema>
export type Project = z.infer<typeof ProjectSchema>
export type ResumeData = z.infer<typeof ResumeDataSchema>
export type CreateResume = z.infer<typeof CreateResumeSchema>