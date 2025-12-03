import Link from 'next/link'
import Image from 'next/image'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="HiiiWAV"
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/fund" className="text-[#99FF69] hover:text-[#7ACC54] transition-colors font-medium">
              HiiiWAV 50
            </Link>
            <Link href="/projects" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Projects
            </Link>
            <Link href="/joint-ventures" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Joint Ventures
            </Link>
            <a href="https://oaklandtechweek.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Oakland Tech Week
            </a>
            <Link href="/blog" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Blog
            </Link>
            <Link href="/donate" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Support HiiiWAV
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="text-sm text-gray-400 hover:text-[#99FF69] transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
