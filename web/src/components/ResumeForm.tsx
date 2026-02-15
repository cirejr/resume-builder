import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useResumeStore, type Experience, type Education, type Project } from '@/stores/resumeStore'

export function ResumeForm() {
  const {
    data,
    resumeTitle,
    setPersonalInfo,
    setSummary,
    setExperience,
    setEducation,
    setSkills,
    setProjects,
    setResumeTitle,
  } = useResumeStore()

  const [newSkill, setNewSkill] = useState('')
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...data.skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (index: number) => {
    setSkills(data.skills.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    setEditingExperience(newExp)
  }

  const saveExperience = () => {
    if (editingExperience) {
      const exists = data.experience.find(e => e.id === editingExperience.id)
      if (exists) {
        setExperience(data.experience.map(e => e.id === editingExperience.id ? editingExperience : e))
      } else {
        setExperience([...data.experience, editingExperience])
      }
      setEditingExperience(null)
    }
  }

  const deleteExperience = (id: string) => {
    setExperience(data.experience.filter(e => e.id !== id))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
    }
    setEditingEducation(newEdu)
  }

  const saveEducation = () => {
    if (editingEducation) {
      const exists = data.education.find(e => e.id === editingEducation.id)
      if (exists) {
        setEducation(data.education.map(e => e.id === editingEducation.id ? editingEducation : e))
      } else {
        setEducation([...data.education, editingEducation])
      }
      setEditingEducation(null)
    }
  }

  const deleteEducation = (id: string) => {
    setEducation(data.education.filter(e => e.id !== id))
  }

  const addProject = () => {
    const newProj: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
    }
    setEditingProject(newProj)
  }

  const saveProject = () => {
    if (editingProject) {
      const exists = data.projects.find(p => p.id === editingProject.id)
      if (exists) {
        setProjects(data.projects.map(p => p.id === editingProject.id ? editingProject : p))
      } else {
        setProjects([...data.projects, editingProject])
      }
      setEditingProject(null)
    }
  }

  const deleteProject = (id: string) => {
    setProjects(data.projects.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            placeholder="Enter resume title"
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={data.personal.name}
                onChange={(e) => setPersonalInfo({ ...data.personal, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={data.personal.title}
                onChange={(e) => setPersonalInfo({ ...data.personal, title: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personal.email}
                onChange={(e) => setPersonalInfo({ ...data.personal, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personal.phone}
                onChange={(e) => setPersonalInfo({ ...data.personal, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.personal.location}
                onChange={(e) => setPersonalInfo({ ...data.personal, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input
                id="linkedin"
                value={data.personal.linkedin || ''}
                onChange={(e) => setPersonalInfo({ ...data.personal, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub (optional)</Label>
            <Input
              id="github"
              value={data.personal.github || ''}
              onChange={(e) => setPersonalInfo({ ...data.personal, github: e.target.value })}
              placeholder="https://github.com/johndoe"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief overview of your professional background and key strengths..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., React, TypeScript)"
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} type="button">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(index)}>
                {skill} ×
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Experience</CardTitle>
          <Button onClick={addExperience} type="button" size="sm">Add Experience</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{exp.position}</p>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingExperience(exp)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} type="button" size="sm">Add Education</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingEducation(edu)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteEducation(edu.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={addProject} type="button" size="sm">Add Project</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{proj.name}</p>
                  <p className="text-sm text-muted-foreground">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProject(proj)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteProject(proj.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience Edit Modal */}
      {editingExperience && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingExperience.id ? 'Edit' : 'Add'} Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={editingExperience.position}
                  onChange={(e) => setEditingExperience({ ...editingExperience, position: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={editingExperience.startDate}
                    onChange={(e) => setEditingExperience({ ...editingExperience, startDate: e.target.value })}
                    placeholder="Jan 2020"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={editingExperience.endDate}
                    onChange={(e) => setEditingExperience({ ...editingExperience, endDate: e.target.value })}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingExperience.description}
                  onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingExperience(null)}>Cancel</Button>
                <Button onClick={saveExperience}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Education Edit Modal */}
      {editingEducation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingEducation.id ? 'Edit' : 'Add'} Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={editingEducation.institution}
                  onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={editingEducation.degree}
                  onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={editingEducation.startDate}
                    onChange={(e) => setEditingEducation({ ...editingEducation, startDate: e.target.value })}
                    placeholder="2016"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    value={editingEducation.endDate}
                    onChange={(e) => setEditingEducation({ ...editingEducation, endDate: e.target.value })}
                    placeholder="2020"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>GPA (optional)</Label>
                <Input
                  value={editingEducation.gpa || ''}
                  onChange={(e) => setEditingEducation({ ...editingEducation, gpa: e.target.value })}
                  placeholder="3.8"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingEducation(null)}>Cancel</Button>
                <Button onClick={saveEducation}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Project Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingProject.id ? 'Edit' : 'Add'} Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div className="space-y-2">
                <Label>URL (optional)</Label>
                <Input
                  value={editingProject.url || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                <Button onClick={saveProject}>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
