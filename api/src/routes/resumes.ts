import { db } from '~/db/index'
import { resumes } from '~/db/schema'
import { requireAuth } from '~/lib/middleware/auth'
import { CreateResumeSchema } from '~/types/resume'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  // All routes require authentication
  const userId = await requireAuth(event)

  if (method === 'GET') {
    const query = getQuery(event)
    
    // Get single resume by ID
    if (query.id) {
      const resume = await db.query.resumes.findFirst({
        where: and(
          eq(resumes.id, query.id as string),
          eq(resumes.clerkUserId, userId)
        )
      })

      if (!resume) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Resume not found'
        })
      }

      return resume
    }

    // List all resumes for the user
    const userResumes = await db.query.resumes.findMany({
      where: eq(resumes.clerkUserId, userId),
      orderBy: (resumes, { desc }) => [desc(resumes.updatedAt)]
    })

    return userResumes
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const validated = CreateResumeSchema.parse(body)
    
    // Generate a unique slug
    const slug = `resume-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    const [newResume] = await db.insert(resumes).values({
      clerkUserId: userId,
      title: validated.title,
      data: validated.data,
      templateId: validated.templateId || 'minimal-professional',
      slug,
    }).returning()

    return { id: newResume.id, slug: newResume.slug }
  }

  if (method === 'PUT') {
    const query = getQuery(event)
    if (!query.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Resume ID is required'
      })
    }

    const body = await readBody(event)
    const validated = CreateResumeSchema.parse(body)

    // Verify ownership
    const existing = await db.query.resumes.findFirst({
      where: and(
        eq(resumes.id, query.id as string),
        eq(resumes.clerkUserId, userId)
      )
    })

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resume not found'
      })
    }

    await db.update(resumes)
      .set({
        title: validated.title,
        data: validated.data,
        templateId: validated.templateId || existing.templateId,
        updatedAt: new Date(),
      })
      .where(eq(resumes.id, query.id as string))

    return { success: true }
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    if (!query.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Resume ID is required'
      })
    }

    // Verify ownership
    const existing = await db.query.resumes.findFirst({
      where: and(
        eq(resumes.id, query.id as string),
        eq(resumes.clerkUserId, userId)
      )
    })

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resume not found'
      })
    }

    await db.delete(resumes).where(eq(resumes.id, query.id as string))

    return { success: true }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
