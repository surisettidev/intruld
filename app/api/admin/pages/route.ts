import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge';

// GET: Fetch ALL pages
export async function GET() {
  const { data, error } = await supabase
    .from('content_pages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST: Create a NEW page
export async function POST(request: Request) {
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('content_pages')
    .insert([body])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
>>>>>>> 631cd69351798e815cff020de5fd7631c636113c
