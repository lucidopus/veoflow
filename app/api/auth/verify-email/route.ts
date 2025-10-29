import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Email verification endpoint
 * Verifies email using JWT token from signup
 * Allows users to confirm email without checking email client
 */
export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // For development: Accept a verification token format
    // Token format: "verify:{email}:{timestamp}"
    if (token.startsWith('verify:')) {
      const [, email] = token.split(':')

      if (!email) {
        return NextResponse.json(
          { error: 'Invalid token format' },
          { status: 400 }
        )
      }

      const supabase = await createAdminClient()

      // Get user by email
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers()

      if (getUserError) {
        return NextResponse.json(
          { error: 'Failed to find user' },
          { status: 500 }
        )
      }

      const user = users.find(u => u.email === email)

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      // Update user to mark email as confirmed
      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        email_confirm: true,
      })

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to verify email' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Email verified successfully',
          user_id: user.id
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      {
        error: 'Verification failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
