export default defineEventHandler(async (event) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'resume-builder-api'
  }
})