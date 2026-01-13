'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// 1. Create a separate component for the Login Form logic
function LoginForm() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error') // Now safe to use here

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      alert('Invalid Password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase tracking-widest">Admin Access</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 mb-4 text-xs font-mono uppercase text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ENTER SECURITY KEY"
            className="w-full bg-black border border-neutral-700 p-3 text-white outline-none focus:border-white transition-colors font-mono text-center"
          />
          <button
            disabled={loading}
            className="w-full bg-white text-black font-bold uppercase py-3 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Unlock Panel'}
          </button>
        </form>
      </div>
    </div>
  )
}

// 2. Export the Page component wrapping the form in Suspense
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
