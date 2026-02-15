import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { resumeApi } from '@/lib/api'
import { MinimalProfessional } from '@/templates/MinimalProfessional'
import { TechDev } from '@/templates/TechDev'
import type { ResumeData } from '@/stores/resumeStore'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { FileText } from 'lucide-react'

export const Route = createFileRoute('/r/$slug')({
  component: PublicResumePage,
})

function PublicResumePage() {
  const { slug } = useParams({ from: '/r/$slug' })
  const [resume, setResume] = useState<{
    title: string
    data: ResumeData
    templateId: string
    updatedAt: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPublicResume()
  }, [slug])

  const loadPublicResume = async () => {
    try {
      setLoading(true)
      const data = await resumeApi.getPublicResume(slug)
      setResume(data)
    } catch (err) {
      setError('Resume not found or not public')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FileText className="h-16 w-16 text-gray-400" />
        <h1 className="text-2xl font-bold">Resume Not Found</h1>
        <p className="text-gray-600">{error || 'This resume may have been removed or made private.'}</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    )
  }

  const TemplateComponent = resume.templateId === 'tech-dev' ? TechDev : MinimalProfessional

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Resume Builder
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
            </span>
            <Button asChild>
              <Link to="/sign-up">Create Your Own</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <TemplateComponent data={resume.data} />
        </div>
      </main>
    </div>
  )
}
