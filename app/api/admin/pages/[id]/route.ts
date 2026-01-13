import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge';

// 1. Define params as a Promise (Next.js 15 Requirement)
type RouteParams = { params: Promise<{ id: string }> }

// GET: Fetch ONE specific page
export async function GET(request: Request, props: RouteParams) {
  const params = await props.params;
  const { data, error } = await supabase
    .from('content_pages')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PUT: Update ONE specific page
export async function PUT(request: Request, props: RouteParams) {
  const params = await props.params;
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('content_pages')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE: Delete ONE specific page
export async function DELETE(request: Request, props: RouteParams) {
  const params = await props.params;
  const { error } = await supabase
    .from('content_pages')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
<<<<<<< HEAD
}
=======
}
>>>>>>> 631cd69351798e815cff020de5fd7631c636113c
