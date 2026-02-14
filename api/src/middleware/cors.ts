import { defineEventHandler, setResponseHeaders } from 'h3'

export default defineEventHandler((event) => {
  // Set CORS headers for all responses
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  })

  // Handle preflight OPTIONS requests
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    return ''
  }
})
