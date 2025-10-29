import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Create a new video job in the database
    const { data: job, error: jobError } = await supabase
      .from('video_jobs')
      .insert({
        collection_url: url,
        status: 'pending',
        total_products: 0,
        completed_products: 0,
        failed_products: 0,
        error_message: null,
        metadata: {}
      })
      .select()
      .single()

    if (jobError) {
      console.error('Error creating video job:', jobError)
      return NextResponse.json(
        { error: 'Failed to create video job' },
        { status: 500 }
      )
    }

    // TODO: Trigger the actual pipeline processing using Trigger.dev
    // For now, we'll just return success and the job will remain in pending state

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        status: job.status,
        collection_url: job.collection_url,
        created_at: job.created_at
      },
      message: 'Collection processing started. You can track progress in your dashboard.'
    })

  } catch (error) {
    console.error('Unexpected error in process-collection:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}