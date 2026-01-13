import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Clear the admin session cookie
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    // Redirect to login page
    return NextResponse.redirect(new URL('/admin/login', request.url))
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}
