export default defineEventHandler((event) => {
  // Return 404 with helpful message for undefined routes
  throw createError({
    statusCode: 404,
    statusMessage: `API route not found: ${event.path}. Available routes: /resumes, /export, /public/resume, /health`
  })
})
