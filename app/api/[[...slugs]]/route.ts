import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'

const app = new Elysia()
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: 'API Documentation',
        version: '1.0.0'
      }
    }
  }))
  .use(cookie())
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }))
  .get('/', () => 'Hello Elysia!')

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle 
