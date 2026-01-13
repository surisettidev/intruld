import Link from 'next/link'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const runtime = 'edge'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side admin authentication check
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  
  // Check if user is authenticated
  const isAuthenticated = adminSession?.value === (process.env.ADMIN_SECRET_KEY || 'Kbssol@331')
  
  // If not authenticated, only render the children (login page) without sidebar
  if (!isAuthenticated) {
    return (
      <div className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </div>
    )
  }

  // If authenticated, render full admin layout with sidebar
  return (
    <div className={inter.className}>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar - Only shown when authenticated */}
        <aside className="w-64 bg-black text-white flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin" className="text-2xl font-bold">
              Intru Admin
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                📦 Products
              </Link>
              <Link
                href="/admin/orders"
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                🛍️ Orders
              </Link>
              <Link
                href="/admin/pages"
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                📄 Pages
              </Link>
              <Link
                href="/admin/settings"
                className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                ⚙️ Settings
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
              ← Back to Store
            </Link>
            <form action="/api/admin/auth/logout" method="POST" className="mt-2">
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-center text-sm"
              >
                Logout
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
