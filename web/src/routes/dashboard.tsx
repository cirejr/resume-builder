import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, FileText, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { resumeApi, type Resume } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [resumes, setResumes] = useState<Array<Resume>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' })
    }
  }, [isLoaded, isSignedIn, navigate])

  useEffect(() => {
    if (isSignedIn) {
      loadResumes()
    }
  }, [isSignedIn])

  const loadResumes = async () => {
    try {
      setLoading(true)
      const data = await resumeApi.getAll()
      setResumes(data)
    } catch (error) {
      console.error('Failed to load resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null // or loading spinner
  }

  return (
    <div className="min-h-screen bg-foreground dark:bg-background">
      {/* Navigation */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Resume Builder
          </Link>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
          <Button asChild>
            <Link to="/resume/new" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Loading...
          </div>
        ) : resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your first resume to get started
              </p>
              <Button asChild>
                <Link to="/resume/new">Create Resume</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link to={`/resume/${resume.id}`}>Edit</Link>
                    </Button>
                    {resume.isPublic && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/r/${resume.slug}`} target="_blank">View</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
