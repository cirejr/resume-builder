import { chromium } from 'playwright'
import { ResumeDataSchema } from '~/types/resume'
import { createMinimalProfessionalTemplate, createTechDevTemplate } from '~/utils/resume-templates'
import { requireAuth } from '~/lib/middleware/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  if (method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Require authentication for export
  await requireAuth(event)

  const body = await readBody(event)
  const { data, template = 'minimal-professional' } = body

  try {
    const validatedData = ResumeDataSchema.parse(data)
    
    let html: string
    if (template === 'tech-dev') {
      html = createTechDevTemplate(validatedData)
    } else {
      html = createMinimalProfessionalTemplate(validatedData)
    }

    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.setContent(html, { waitUntil: 'networkidle' })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    })

    await browser.close()

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', 'attachment; filename="resume.pdf"')
    
    return pdf
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid resume data or template'
    })
  }
})