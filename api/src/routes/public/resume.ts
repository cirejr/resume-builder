import { db } from '~/db/index'
import { resumes } from '~/db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * Public route for viewing shared resumes
 * GET /public/resume?slug=<slug>
 */
export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const query = getQuery(event)
  
  if (!query.slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required'
    })
  }

  const resume = await db.query.resumes.findFirst({
    where: and(
      eq(resumes.slug, query.slug as string),
      eq(resumes.isPublic, true)
    )
  })

  if (!resume) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Resume not found or not public'
    })
  }

  // Return only necessary fields for public view
  return {
    title: resume.title,
    data: resume.data,
    templateId: resume.templateId,
    updatedAt: resume.updatedAt,
  }
})
