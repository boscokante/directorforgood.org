import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Heart, Building2 } from "lucide-react";
import { JOINT_VENTURES_SEED } from "@/lib/types";

export const metadata = {
  title: "Joint Ventures - HiiiWAV",
  description: "Boutique, label-like partnerships with artists and organizations. Explore HiiiWAV's Joint Venture roster.",
};

// Map JV slugs to images
const jvImages: Record<string, string> = {
  "choice-scores": "/media/images/Kev-Choice.png",
  "ryan-nicole": "/media/images/RyanNicole.png",
  "prospect-band": "/media/images/Prospect.png",
  "alphabet-rockers": "/media/images/Alphabet-Rockers.png",
  "sol-affirmations": "/media/images/HiiiWAV-Fest.png",
  "soul-slappers": "/media/images/Dame-Drummer.png",
};

export default function JointVenturesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#A34DFF]/20 border border-[#A34DFF]/40 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-[#A34DFF]" />
            <span className="text-[#A34DFF] font-medium">Partnership Model</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Joint <span className="text-[#99FF69]">Ventures</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Boutique, label-like partnerships with artists and organizations. 
            We provide infrastructure, support, and community—they bring the vision.
          </p>
          
          <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
            <a href="#apply">Become a Joint Venture</a>
          </Button>
        </div>
      </section>

      {/* What is a JV */}
      <section className="py-20 bg-gray-900">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            What is a <span className="text-[#99FF69]">Joint Venture</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99FF69]/20 mb-4">
                <Building2 className="w-8 h-8 text-[#99FF69]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Infrastructure</h3>
              <p className="text-gray-400">
                Fiscal sponsorship, back-office support, and nonprofit infrastructure so you can focus on your art.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A34DFF]/20 mb-4">
                <Users className="w-8 h-8 text-[#A34DFF]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">
                Access to HiiiWAV&apos;s network of artists, founders, funders, and creative technologists.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D16]/20 mb-4">
                <Heart className="w-8 h-8 text-[#FF4D16]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partnership</h3>
              <p className="text-gray-400">
                Not just a service—a true partnership. We&apos;re invested in your success and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JV Roster */}
      <section className="py-20 bg-black">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our <span className="text-[#99FF69]">Roster</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Meet the artists and organizations building with HiiiWAV.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {JOINT_VENTURES_SEED.map((jv) => (
              <Link 
                key={jv.slug}
                href={`/joint-ventures/${jv.slug}`}
                className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-[#99FF69] transition-all hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  {jvImages[jv.slug] ? (
                    <img 
                      src={jvImages[jv.slug]}
                      alt={jv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#A34DFF]/30 to-[#99FF69]/30 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/50">{jv.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${
                    jv.status === "current" 
                      ? "bg-[#99FF69] text-black" 
                      : "bg-gray-700 text-gray-300"
                  }`}>
                    {jv.status === "current" ? "ACTIVE" : "ALUMNI"}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#99FF69] transition-colors">
                    {jv.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {jv.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {jv.focusAreas.slice(0, 3).map((area) => (
                      <span key={area} className="text-xs bg-black border border-gray-700 rounded-full px-2 py-1">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="py-20 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Become a <span className="text-[#99FF69]">Joint Venture</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We&apos;re selective about who we partner with—quality over quantity. If you&apos;re an artist 
            or organization doing meaningful work at the intersection of culture and technology, 
            we want to hear from you.
          </p>
          
          <div className="bg-black border border-gray-800 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">What We Look For</h3>
            <ul className="text-left text-gray-400 space-y-2 mb-6">
              <li>• Artists and organizations with a clear vision and track record</li>
              <li>• Work that intersects culture, community, and/or technology</li>
              <li>• Alignment with HiiiWAV&apos;s mission and values</li>
              <li>• Readiness to leverage nonprofit infrastructure for growth</li>
            </ul>
            
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
              <a href="mailto:jv@hiiiwav.org">Apply to Partner</a>
            </Button>
          </div>
        </div>
      </section>

      {/* For Funders */}
      <section className="py-20 bg-black">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">For Funders & Sponsors</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Joint Ventures are a key part of the HiiiWAV 50 ecosystem. Supporting JVs means 
            supporting artist-led organizations building sustainable creative businesses.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-black border-2 border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black font-semibold">
              <Link href="/fund">Learn About HiiiWAV 50</Link>
            </Button>
            <Button asChild className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <Link href="/support">Support JVs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}



