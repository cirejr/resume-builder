import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { ResumeForm } from '@/components/ResumeForm'
import { PreviewPanel } from '@/components/PreviewPanel'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/stores/resumeStore'
import { resumeApi } from '@/lib/api'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, ArrowLeft, Save, Download } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/resume/new')({
  component: NewResumePage,
})

function NewResumePage() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { resumeTitle, data, selectedTemplate, resetResume } = useResumeStore()
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' })
    }
  }, [isLoaded, isSignedIn, navigate])

  useEffect(() => {
    // Reset form for new resume
    resetResume()
  }, [resetResume])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      const result = await resumeApi.create(resumeTitle, data, selectedTemplate)
      setMessage('Resume created successfully!')
      // Redirect to edit page after creation
      navigate({ to: '/resume/$resumeId', params: { resumeId: result.id } })
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to create resume')
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    setMessage(null)
    try {
      const blob = await resumeApi.export(data, selectedTemplate)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resumeTitle.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      setMessage('Resume exported successfully!')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to export resume')
    } finally {
      setIsExporting(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">New Resume</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{resumeTitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Resume'}
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResumeForm />
          </div>
          <div className="lg:sticky lg:top-20 lg:self-start">
            <PreviewPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
