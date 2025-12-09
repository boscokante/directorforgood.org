import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth(async (req) => {
  const { pathname } = req.nextUrl

  // Allow deck editor without auth
  if (pathname === '/admin/deck') {
    return NextResponse.next()
  }

  // Protect other admin routes
  if (pathname.startsWith('/admin')) {
    const session = req.auth

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Check if user has admin role
    if ((session.user as any)?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
