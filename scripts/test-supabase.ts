#!/usr/bin/env tsx

/**
 * Supabase Database Connection Test
 * Tests basic CRUD operations to verify database setup
 */

import { config } from 'dotenv'
import { createClient } from '../lib/supabase/client'

// Load environment variables
config({ path: '.env.local' })

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Database Connection...\n')

  try {
    const supabase = createClient()

    // Test 1: Create a video job
    console.log('1. Creating test video job...')
    const { data: job, error: jobError } = await supabase
      .from('video_jobs')
      .insert({
        collection_url: 'https://test.com',
        status: 'pending' as const,
        total_products: 0,
        completed_products: 0,
        failed_products: 0,
      })
      .select()
      .single()

    if (jobError) {
      throw new Error(`Failed to create job: ${jobError.message}`)
    }

    console.log(`✓ Create: ${job.id}`)

    // Test 2: Read the job back
    console.log('2. Reading job back...')
    const { data: readJob, error: readError } = await supabase
      .from('video_jobs')
      .select('*')
      .eq('id', job.id)
      .single()

    if (readError) {
      throw new Error(`Failed to read job: ${readError.message}`)
    }

    console.log(`✓ Read: ${readJob.collection_url}`)

    // Test 3: Update the job
    console.log('3. Updating job status...')
    const { error: updateError } = await supabase
      .from('video_jobs')
      .update({ status: 'completed' as const })
      .eq('id', job.id)

    if (updateError) {
      throw new Error(`Failed to update job: ${updateError.message}`)
    }

    console.log('✓ Update: completed')

    // Test 4: Create a product linked to the job
    console.log('4. Creating test product...')
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        job_id: job.id,
        product_name: 'Test Product',
        product_url: 'https://test.com/product',
        image_url: 'https://test.com/image.jpg',
        status: 'pending' as const,
      })
      .select()
      .single()

    if (productError) {
      throw new Error(`Failed to create product: ${productError.message}`)
    }

    console.log(`✓ Product created: ${product.id}`)

    // Test 5: Delete the job (cascade will delete product)
    console.log('5. Deleting job and products...')
    const { error: deleteError } = await supabase
      .from('video_jobs')
      .delete()
      .eq('id', job.id)

    if (deleteError) {
      throw new Error(`Failed to delete job: ${deleteError.message}`)
    }

    console.log('✓ Delete: success')

    console.log('\n🎉 All tests passed! Database is properly configured.')

  } catch (error) {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  }
}

// Run the test
testSupabaseConnection()