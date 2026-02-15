import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { setAuthTokenGetter } from '@/lib/api'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      // Set up the token getter for API calls
      setAuthTokenGetter(async () => {
        if (!isSignedIn) return null
        try {
          return await getToken()
        } catch {
          return null
        }
      })
    }
  }, [isLoaded, isSignedIn, getToken])

  return <>{children}</>
}
