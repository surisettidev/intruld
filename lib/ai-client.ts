/**
 * Multi-Model AI Client for Product Description Generation
 * Supports Grok (xAI) and Gemini (Google) models
 */

export type AIModel = 'grok' | 'gemini'

export interface AIGenerateRequest {
  model: AIModel
  prompt: string
  maxTokens?: number
  temperature?: number
}

export interface AIGenerateResponse {
  success: boolean
  text?: string
  error?: string
  model: AIModel
}

/**
 * Generate text using Grok (xAI) API
 */
async function generateWithGrok(
  prompt: string,
  apiKey: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: 'You are a creative copywriter for an Indian streetwear brand called Intru. Write compelling, edgy product descriptions that appeal to young adults. Keep it authentic and casual.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options?.maxTokens || 500,
      temperature: options?.temperature || 0.8
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `Grok API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

/**
 * Generate text using Gemini (Google) API
 */
async function generateWithGemini(
  prompt: string,
  apiKey: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a creative copywriter for an Indian streetwear brand called Intru. Write compelling, edgy product descriptions that appeal to young adults. Keep it authentic and casual.\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: options?.maxTokens || 500,
          temperature: options?.temperature || 0.8
        }
      })
    }
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || ''
}

/**
 * Main AI client interface
 */
export class AIClient {
  private grokApiKey?: string
  private geminiApiKey?: string

  constructor(options?: { grokApiKey?: string; geminiApiKey?: string }) {
    this.grokApiKey = options?.grokApiKey || process.env.GROK_API_KEY
    this.geminiApiKey = options?.geminiApiKey || process.env.GEMINI_API_KEY
  }

  /**
   * Generate text using the specified AI model
   */
  async generate(request: AIGenerateRequest): Promise<AIGenerateResponse> {
    const { model, prompt, maxTokens, temperature } = request

    try {
      let text: string

      if (model === 'grok') {
        if (!this.grokApiKey) {
          return {
            success: false,
            error: 'Grok API key not configured. Please set GROK_API_KEY environment variable.',
            model: 'grok'
          }
        }
        text = await generateWithGrok(prompt, this.grokApiKey, { maxTokens, temperature })
      } else if (model === 'gemini') {
        if (!this.geminiApiKey) {
          return {
            success: false,
            error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.',
            model: 'gemini'
          }
        }
        text = await generateWithGemini(prompt, this.geminiApiKey, { maxTokens, temperature })
      } else {
        return {
          success: false,
          error: `Unsupported model: ${model}`,
          model
        }
      }

      return {
        success: true,
        text,
        model
      }
    } catch (error) {
      console.error(`AI generation error (${model}):`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        model
      }
    }
  }

  /**
   * Generate product description from basic product info
   */
  async generateProductDescription(
    productName: string,
    category?: string,
    model: AIModel = 'gemini'
  ): Promise<AIGenerateResponse> {
    const prompt = `Generate a compelling product description for a streetwear item:
Product Name: ${productName}
${category ? `Category: ${category}` : ''}

Create a description that:
- Highlights the product's unique features and style
- Explains the fit and comfort
- Mentions quality and materials (assume heavyweight cotton, oversized fit)
- Appeals to Indian youth culture and streetwear enthusiasts
- Is 2-3 paragraphs long
- Uses casual, authentic language

Write only the description, no additional commentary.`

    return this.generate({ model, prompt, maxTokens: 500, temperature: 0.8 })
  }

  /**
   * Check if a specific model is configured
   */
  isModelConfigured(model: AIModel): boolean {
    if (model === 'grok') return !!this.grokApiKey
    if (model === 'gemini') return !!this.geminiApiKey
    return false
  }

  /**
   * Get list of configured models
   */
  getConfiguredModels(): AIModel[] {
    const models: AIModel[] = []
    if (this.grokApiKey) models.push('grok')
    if (this.geminiApiKey) models.push('gemini')
    return models
  }
}

/**
 * Create a singleton AI client instance
 */
export const aiClient = new AIClient()
