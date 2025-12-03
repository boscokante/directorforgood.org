import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Oakland Tech Week - HiiiWAV",
  description: "Oakland Tech Week brings together technologists, artists, founders, and community to celebrate Oakland's unique position at the intersection of culture and innovation.",
};

export default function OaklandTechWeekPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-black to-purple-600/30" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        <div className="relative z-10 container text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#99FF69]" />
            <span className="text-[#99FF69] font-medium">Powered by HiiiWAV 50</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            Oakland<br />
            <span className="text-[#99FF69]">Tech Week</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Where culture meets innovation. A week of events celebrating Oakland&apos;s unique position 
            at the intersection of technology and community.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6">
              <a href="https://oaklandtechweek.com" target="_blank" rel="noopener noreferrer">
                Visit OaklandTechWeek.com <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6">
              <a href="#hiiiwav-involvement">HiiiWAV&apos;s Role</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is OTW */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            What is <span className="text-[#99FF69]">Oakland Tech Week</span>?
          </h2>
          
          <p className="text-xl text-gray-300 text-center leading-relaxed mb-12">
            Oakland Tech Week is a city-wide celebration of Oakland&apos;s tech and creative communities. 
            From panels and workshops to performances and parties, OTW brings together the people 
            building Oakland&apos;s future.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Week of Events</h3>
              <p className="text-gray-400">
                Dozens of events across Oakland—panels, workshops, demos, performances, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-gray-400">
                Built by and for Oakland—technologists, artists, founders, and neighbors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99FF69]/20 mb-4">
                <MapPin className="w-8 h-8 text-[#99FF69]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Across Oakland</h3>
              <p className="text-gray-400">
                Events in venues throughout the city—from downtown to the hills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HiiiWAV's Role */}
      <section id="hiiiwav-involvement" className="py-24 bg-gray-900">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            HiiiWAV&apos;s <span className="text-[#99FF69]">Role</span>
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            HiiiWAV is a key partner and producer of Oakland Tech Week, bringing our unique perspective 
            on culture, creativity, and technology.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#99FF69] mb-4">Programming</h3>
              <p className="text-gray-400 mb-4">
                We produce panels, workshops, and showcases that highlight the intersection of 
                music, art, and technology.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• AI and creativity sessions</li>
                <li>• Artist-founder panels</li>
                <li>• Music tech demos</li>
                <li>• Community showcases</li>
              </ul>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#99FF69] mb-4">Community</h3>
              <p className="text-gray-400 mb-4">
                We bring our network of artists, founders, and creative technologists to 
                OTW events and programming.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• Joint Venture artists</li>
                <li>• Code Vibes alumni</li>
                <li>• HiiiFrequency residents</li>
                <li>• Bay Area creatives</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-24 bg-black">
        <div className="container px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-8">
            Whether you want to attend, speak, sponsor, or host an event—there&apos;s a place for you 
            at Oakland Tech Week.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
              <a href="https://oaklandtechweek.com" target="_blank" rel="noopener noreferrer">
                Visit OaklandTechWeek.com <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button asChild size="lg" className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <Link href="/support">
                Sponsor Through HiiiWAV
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <p className="text-gray-400 mb-4">Part of the HiiiWAV ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects/code-vibes" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Code Vibes
            </Link>
            <Link href="/projects/hiiiwav-fest" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              HiiiWAV FEST
            </Link>
            <Link href="/joint-ventures" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Joint Ventures
            </Link>
            <Link href="/fund" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              HiiiWAV 50 Fund
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



