import { clerkClient } from '@clerk/clerk-sdk-node'
import type { H3Event } from 'h3'

/**
 * Extract and verify the Clerk session token from the request
 * Returns the userId if valid, throws error if not
 */
export async function requireAuth(event: H3Event): Promise<string> {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Missing or invalid authorization header'
    })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const session = await clerkClient.verifyToken(token)
    
    if (!session.sub) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - Invalid session'
      })
    }

    return session.sub
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid token'
    })
  }
}

/**
 * Optional auth - returns userId if valid token exists, null otherwise
 */
export async function getAuthUserId(event: H3Event): Promise<string | null> {
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const session = await clerkClient.verifyToken(token)
    return session.sub || null
  } catch {
    return null
  }
}
