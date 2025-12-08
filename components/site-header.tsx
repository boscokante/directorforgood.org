import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

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
            
            {/* Events Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-[#99FF69] transition-colors">
                Events
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-gray-900 border border-gray-800 rounded-lg py-2 min-w-[160px] shadow-xl">
                  <Link
                    href="/events"
                    className="block px-4 py-2 text-gray-300 hover:text-[#99FF69] hover:bg-gray-800 transition-colors"
                  >
                    All Events
                  </Link>
                  <Link
                    href="/events/upcoming"
                    className="block px-4 py-2 text-gray-300 hover:text-[#99FF69] hover:bg-gray-800 transition-colors"
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href="/events/past"
                    className="block px-4 py-2 text-gray-300 hover:text-[#99FF69] hover:bg-gray-800 transition-colors"
                  >
                    Past Events
                  </Link>
                </div>
              </div>
            </div>
            
            <a href="https://oaklandtechweek.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#99FF69] transition-colors">
              Oakland Tech Week
            </a>
            {/* HiiiLIGHTS Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-[#99FF69] transition-colors">
                HiiiLIGHTS
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-gray-900 border border-gray-800 rounded-lg py-2 min-w-[180px] shadow-xl">
                  <Link
                    href="/hiiilights"
                    className="block px-4 py-2 text-gray-300 hover:text-[#99FF69] hover:bg-gray-800 transition-colors"
                  >
                    Newsletter Archive
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-gray-300 hover:text-[#99FF69] hover:bg-gray-800 transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>
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
