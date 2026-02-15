import { createFileRoute, Link } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Resume Builder
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none',
                },
              }}
              afterSignInUrl="/dashboard"
              signUpUrl="/sign-up"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
