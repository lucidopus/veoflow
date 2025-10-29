/**
 * Database types for VeoFlow Supabase schema
 * Generated from the database schema defined in Phase 3
 */

export type VideoJobStatus = 'pending' | 'scraping' | 'generating' | 'completed' | 'failed'

export type ProductStatus = 'pending' | 'generating' | 'completed' | 'failed'

export interface VideoJob {
  id: string
  collection_url: string
  status: VideoJobStatus
  total_products: number
  completed_products: number
  failed_products: number
  error_message: string | null
  created_at: string
  updated_at: string
  metadata: Record<string, unknown> | null
}

export interface Product {
  id: string
  job_id: string
  product_name: string | null
  product_url: string | null
  image_url: string | null
  status: ProductStatus
  video_url: string | null
  error_reason: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  username: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      video_jobs: {
        Row: VideoJob
        Insert: Omit<VideoJob, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VideoJob, 'id' | 'created_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}