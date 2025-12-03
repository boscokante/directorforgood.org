import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Users, Music, Sparkles } from "lucide-react";

export const metadata = {
  title: "Donate - HiiiWAV",
  description: "Support creators in building the future with technology. Your donation helps fund Code Vibes programs, events, and community initiatives.",
};

export default function DonatePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#99FF69]/20 mb-6">
            <Heart className="w-10 h-10 text-[#99FF69]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Support the Movement
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your donation empowers artists, activists, and creators to become successful builders 
            through technology, mentorship, and community support.
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-gray-900">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Choose How to Give
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* One-Time Donation */}
            <div className="bg-black border-2 border-[#A34DFF] rounded-xl p-8 text-center hover:border-[#99FF69] transition-colors">
              <h3 className="text-2xl font-bold text-[#99FF69] mb-4">One-Time Gift</h3>
              <p className="text-gray-400 mb-6">
                Make an immediate impact with a single donation of any amount.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["$25", "$50", "$100"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 px-4 border border-gray-600 rounded-lg text-white hover:border-[#99FF69] hover:text-[#99FF69] transition-colors font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["$250", "$500", "$1000"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 px-4 border border-gray-600 rounded-lg text-white hover:border-[#99FF69] hover:text-[#99FF69] transition-colors font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg"
              >
                <a href="https://hiiiwav.org/donate" target="_blank" rel="noopener noreferrer">
                  Donate Now
                </a>
              </Button>
            </div>

            {/* Monthly Donation */}
            <div className="bg-black border-2 border-[#A34DFF] rounded-xl p-8 text-center hover:border-[#99FF69] transition-colors relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#99FF69] text-black text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold text-[#99FF69] mb-4">Monthly Supporter</h3>
              <p className="text-gray-400 mb-6">
                Join our community of recurring donors and provide sustained support.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["$10/mo", "$25/mo", "$50/mo"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 px-4 border border-gray-600 rounded-lg text-white hover:border-[#99FF69] hover:text-[#99FF69] transition-colors font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["$100/mo", "$250/mo", "$500/mo"].map((amount) => (
                  <button
                    key={amount}
                    className="py-3 px-4 border border-gray-600 rounded-lg text-white hover:border-[#99FF69] hover:text-[#99FF69] transition-colors font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg"
              >
                <a href="https://hiiiwav.org/donate-recurring" target="_blank" rel="noopener noreferrer">
                  Become a Monthly Supporter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-black">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Your Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A34DFF]/20 mb-4">
                <Sparkles className="w-8 h-8 text-[#A34DFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Code Vibes Program</h3>
              <p className="text-gray-400">
                Fund our flagship program teaching artists, activists, and creators to build software and AI agents that serve their communities.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99FF69]/20 mb-4">
                <Users className="w-8 h-8 text-[#99FF69]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community Events</h3>
              <p className="text-gray-400">
                Support HiiiWAV Fest, Demo Days, and gatherings that bring our community together.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A34DFF]/20 mb-4">
                <Music className="w-8 h-8 text-[#A34DFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Artist Development</h3>
              <p className="text-gray-400">
                Help musicians access mentorship, resources, and tools to build sustainable careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/10 to-[#99FF69]/10">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#99FF69] mb-2">50+</div>
              <div className="text-gray-400">Artists Supported</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#99FF69] mb-2">$500K+</div>
              <div className="text-gray-400">Funding Distributed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#99FF69] mb-2">20+</div>
              <div className="text-gray-400">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#99FF69] mb-2">1000+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-gray-900">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Other Ways to Help</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Can&apos;t donate right now? There are other ways to support our mission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-black border-2 border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black font-semibold">
              <Link href="/newsletter">Subscribe to Newsletter</Link>
            </Button>
            <Button asChild className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <a href="https://instagram.com/hiiiwav" target="_blank" rel="noopener noreferrer">
                Follow on Instagram
              </a>
            </Button>
            <Button asChild className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <Link href="/our-events">Attend an Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="py-12 bg-black border-t border-gray-800">
        <div className="container px-4 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            HiiiWAV is a 501(c)(3) nonprofit organization. Your donation is tax-deductible 
            to the extent allowed by law. EIN: [Your EIN Here]
          </p>
        </div>
      </section>
    </div>
  );
}

