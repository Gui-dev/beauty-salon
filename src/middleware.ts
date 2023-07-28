import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('beauty_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/schedules/:path*', '/profile/:path*'],
}
