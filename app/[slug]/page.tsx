import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Metadata } from 'next'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

interface ContentPage {
  id: string
  slug: string
  title: string
  content: string
  is_published: boolean
  created_at: string
  updated_at: string
}

async function getContentPage(slug: string): Promise<ContentPage | null> {
  try {
    // Handle Instagram redirect
    if (slug === 'instagram') {
      return {
        id: 'redirect-instagram',
        slug: 'instagram',
        title: 'Instagram Redirect',
        content: '',
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    const { data, error } = await supabase
      .from('content_pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error || !data) {
      console.error('Error fetching content page:', error)
      return null
    }

    return data as ContentPage
  } catch (error) {
    console.error('Error fetching content page:', error)
    return null
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = await getContentPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: `${page.title} | Intru`,
    description: page.content.substring(0, 160),
    openGraph: {
      title: page.title,
      description: page.content.substring(0, 160),
      type: 'website'
    }
  }
}

export default async function ContentPageRoute(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = await getContentPage(params.slug)

  // Handle Instagram redirect
  if (params.slug === 'instagram') {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://instagram.com/intru.in'
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting to Instagram...</h1>
          <p className="text-gray-600">
            If you are not redirected automatically,{' '}
            <a
              href="https://instagram.com/intru.in"
              className="text-blue-600 underline"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">{page.title}</h1>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: {new Date(page.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
