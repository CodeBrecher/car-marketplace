
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://oaomwriaxhxmmseqjgeo.supabase.co'
export const SUPABASE_STORAGE_BUCKET = "images";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hb213cmlheGh4bW1zZXFqZ2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNjUwNjIsImV4cCI6MjA1MTk0MTA2Mn0.2Uob01eomrQD3jCYXn9QpAAFe3LgGPBZkxI8YxTEO5k"
export const supabase = createClient(SUPABASE_URL, supabaseKey)