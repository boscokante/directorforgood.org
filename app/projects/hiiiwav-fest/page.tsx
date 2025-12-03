import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Music, Users, Mic2, PartyPopper, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "HiiiWAV FEST - HiiiWAV",
  description: "Oakland's creative tech festival. Live performances, panels, workshops, and community at the intersection of music, art, and technology.",
};

export default function HiiiwavFestPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/media/images/HiiiWAV-Fest.png"
            alt="HiiiWAV FEST"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#99FF69]" />
            <span className="text-[#99FF69] font-medium">Powered by HiiiWAV 50</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">
            <span className="text-[#99FF69]">HiiiWAV</span>
            <br />
            <span className="text-[#FF4D16]">FEST</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Oakland&apos;s creative tech festival. Music. Art. Technology. Community.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6">
              <a href="#get-involved">Get Involved</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            What is <span className="text-[#FF4D16]">HiiiWAV FEST</span>?
          </h2>
          
          <p className="text-xl text-gray-300 text-center leading-relaxed mb-12">
            HiiiWAV FEST is our signature festival celebrating the intersection of music, art, 
            technology, and community. Live performances from our Joint Venture artists, panels 
            on creative technology, workshops, and more.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FF4D16]/20 mb-4">
                <Music className="w-7 h-7 text-[#FF4D16]" />
              </div>
              <h3 className="font-bold mb-1">Live Music</h3>
              <p className="text-gray-400 text-sm">
                Performances from HiiiWAV artists
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#A34DFF]/20 mb-4">
                <Mic2 className="w-7 h-7 text-[#A34DFF]" />
              </div>
              <h3 className="font-bold mb-1">Panels</h3>
              <p className="text-gray-400 text-sm">
                Conversations on culture & tech
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#99FF69]/20 mb-4">
                <Users className="w-7 h-7 text-[#99FF69]" />
              </div>
              <h3 className="font-bold mb-1">Workshops</h3>
              <p className="text-gray-400 text-sm">
                Hands-on learning sessions
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
                <PartyPopper className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold mb-1">Community</h3>
              <p className="text-gray-400 text-sm">
                Oakland&apos;s creative scene
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-24 bg-gray-900">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Featured <span className="text-[#99FF69]">Artists</span>
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            HiiiWAV FEST showcases our Joint Venture artists and the broader Oakland creative community.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Kev Choice", image: "Kev-Choice.png" },
              { name: "Ryan Nicole", image: "RyanNicole.png" },
              { name: "Alphabet Rockers", image: "Alphabet-Rockers.png" },
              { name: "Prospect", image: "Prospect.png" },
              { name: "GOOROO", image: "GOOROO.png" },
              { name: "Dame Drummer", image: "Dame-Drummer.png" },
            ].map((artist) => (
              <div key={artist.name} className="group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-transparent group-hover:border-[#99FF69] transition-colors">
                  <img
                    src={`/media/images/${artist.image}`}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center mt-2 text-sm font-medium group-hover:text-[#99FF69] transition-colors">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-black border-2 border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black font-semibold">
              <Link href="/joint-ventures">
                Meet All Our Artists <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="get-involved" className="py-24 bg-black">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get <span className="text-[#FF4D16]">Involved</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors">
              <h3 className="text-xl font-bold text-[#99FF69] mb-3">Attend</h3>
              <p className="text-gray-400 mb-4">
                Join us for a day of music, panels, and community. Stay tuned for ticket info.
              </p>
              <Button asChild className="w-full bg-black border border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black">
                <Link href="/newsletter">Get Notified</Link>
              </Button>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors">
              <h3 className="text-xl font-bold text-[#99FF69] mb-3">Perform</h3>
              <p className="text-gray-400 mb-4">
                Artists interested in performing at HiiiWAV FEST can apply through our form.
              </p>
              <Button asChild className="w-full bg-black border border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black">
                <a href="mailto:fest@hiiiwav.org">Apply to Perform</a>
              </Button>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors">
              <h3 className="text-xl font-bold text-[#99FF69] mb-3">Sponsor</h3>
              <p className="text-gray-400 mb-4">
                Partner with HiiiWAV FEST to reach Oakland&apos;s creative tech community.
              </p>
              <Button asChild className="w-full bg-black border border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black">
                <Link href="/support">Become a Sponsor</Link>
              </Button>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors">
              <h3 className="text-xl font-bold text-[#99FF69] mb-3">Volunteer</h3>
              <p className="text-gray-400 mb-4">
                Help make HiiiWAV FEST happen. We need volunteers for setup, registration, and more.
              </p>
              <Button asChild className="w-full bg-black border border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black">
                <a href="mailto:fest@hiiiwav.org">Volunteer</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-gray-900">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Past Events</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/blog/hiiiwav-fest-2024" className="group">
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img 
                  src="/media/images/HiiiWAV-Fest.png"
                  alt="HiiiWAV FEST 2024"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold group-hover:text-[#99FF69] transition-colors">HiiiWAV FEST 2024</h3>
            </Link>
            
            <Link href="/blog/demo-day" className="group">
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img 
                  src="/media/images/Demo-Day-2024-1.jpg"
                  alt="Demo Day 2024"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold group-hover:text-[#99FF69] transition-colors">Demo Day 2024</h3>
            </Link>
            
            <Link href="/blog" className="group">
              <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-[#A34DFF]/30 to-[#99FF69]/30 flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="font-bold group-hover:text-[#99FF69] transition-colors">View All Events</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-gradient-to-r from-[#FF4D16]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <p className="text-gray-400 mb-4">Part of the HiiiWAV ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects/oakland-tech-week" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Oakland Tech Week
            </Link>
            <Link href="/projects/code-vibes" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Code Vibes
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



