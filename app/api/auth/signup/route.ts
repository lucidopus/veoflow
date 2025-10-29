import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Enhanced signup endpoint
 * Creates user in auth and automatically creates profile record
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, username } = body

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createAdminClient()

    // Step 1: Create user in auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        first_name: firstName || '',
        last_name: lastName || '',
        username: username,
      },
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user' },
        { status: 400 }
      )
    }

    const userId = authData.user.id

    // Step 2: Create profile record (or update if trigger already created it)
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email,
        first_name: firstName || null,
        last_name: lastName || null,
        username: username,
      }, {
        onConflict: 'id'
      })

    if (profileError) {
      // Log error but don't fail the request since user is already created
      console.error('Profile creation error:', profileError)
    }

    // Step 3: Immediately verify email
    const { error: verifyError } = await supabase.auth.admin.updateUserById(userId, {
      email_confirm: true,
    })

    if (verifyError) {
      console.error('Email verification error:', verifyError)
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          email: authData.user.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      {
        error: 'Signup failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
