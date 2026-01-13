import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge';

type RouteParams = { params: Promise<{ id: string }> }

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

export async function DELETE(request: Request, props: RouteParams) {
  const params = await props.params;
  const { error } = await supabase
    .from('content_pages')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
