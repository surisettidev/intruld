import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { aiClient, AIModel } from '@/lib/ai-client'

export const runtime = 'edge'

/**
 * POST /api/admin/ai/generate
 * Generate product descriptions using AI models (Grok or Gemini)
 * Protected route - requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')
    const isAuthenticated = adminSession?.value === (process.env.ADMIN_SECRET_KEY || 'Kbssol@331')

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { model, productName, category, prompt } = body

    // Validate required fields
    if (!model || (!productName && !prompt)) {
      return NextResponse.json(
        { 
          error: 'Missing required fields. Provide either productName or custom prompt, and select a model.',
          requiredFields: {
            model: 'AI model to use (grok or gemini)',
            productName: 'Product name for automatic description generation',
            category: 'Optional product category',
            prompt: 'Or provide a custom prompt for free-form generation'
          }
        },
        { status: 400 }
      )
    }

    // Validate model
    if (model !== 'grok' && model !== 'gemini') {
      return NextResponse.json(
        { 
          error: `Invalid model: ${model}. Supported models: grok, gemini`,
          configuredModels: aiClient.getConfiguredModels()
        },
        { status: 400 }
      )
    }

    // Check if the selected model is configured
    if (!aiClient.isModelConfigured(model as AIModel)) {
      return NextResponse.json(
        { 
          error: `Model ${model} is not configured. Please set the required API key environment variable.`,
          requiredEnvVar: model === 'grok' ? 'GROK_API_KEY' : 'GEMINI_API_KEY',
          configuredModels: aiClient.getConfiguredModels()
        },
        { status: 400 }
      )
    }

    // Generate content
    let result
    if (prompt) {
      // Use custom prompt
      result = await aiClient.generate({
        model: model as AIModel,
        prompt,
        maxTokens: 500,
        temperature: 0.8
      })
    } else {
      // Generate product description
      result = await aiClient.generateProductDescription(
        productName,
        category,
        model as AIModel
      )
    }

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error || 'AI generation failed',
          model: result.model
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      text: result.text,
      model: result.model,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Check server logs for more information'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/ai/generate
 * Get information about available AI models and configuration status
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')
    const isAuthenticated = adminSession?.value === (process.env.ADMIN_SECRET_KEY || 'Kbssol@331')

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      availableModels: ['grok', 'gemini'],
      configuredModels: aiClient.getConfiguredModels(),
      models: {
        grok: {
          name: 'Grok',
          provider: 'xAI',
          configured: aiClient.isModelConfigured('grok'),
          envVar: 'GROK_API_KEY',
          description: 'xAI\'s Grok model - fast and creative'
        },
        gemini: {
          name: 'Gemini Pro',
          provider: 'Google',
          configured: aiClient.isModelConfigured('gemini'),
          envVar: 'GEMINI_API_KEY',
          description: 'Google\'s Gemini Pro - versatile and powerful'
        }
      }
    })
  } catch (error) {
    console.error('Error fetching AI config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI configuration' },
      { status: 500 }
    )
  }
}
