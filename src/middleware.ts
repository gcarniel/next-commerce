import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/product(.*)',
    '/sign-in',
    '/sign-up',
    '/api/webhooks/user',
    '/api/webhooks/stripe',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
