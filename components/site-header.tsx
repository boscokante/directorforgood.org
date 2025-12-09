import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Director</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#solution" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <Link href="/deck" className="text-gray-300 hover:text-white transition-colors">
              Pitch Deck
            </Link>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/deck" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Edit Deck
          </Link>
          <Link 
            href="/admin" 
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
