import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Wallet, Shield, Heart, TrendingUp, Home, Sparkles } from "lucide-react";
import { HIIIWAV_50_FUND, PROJECTS_SEED, JOINT_VENTURES_SEED } from "@/lib/types";

export const metadata = {
  title: "HiiiWAV 50 Creative Collective Fund - HiiiWAV",
  description: "Full-spectrum capital for artist-founders. Endowment + real estate + community ownership powering Oakland's creative ecosystem.",
};

export default function FundPage() {
  const fund = HIIIWAV_50_FUND;
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A34DFF]/40 via-black to-[#99FF69]/20" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #99FF69 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-5 py-2 mb-8">
            <Sparkles className="w-5 h-5 text-[#99FF69]" />
            <span className="text-[#99FF69] font-medium">Flagship Initiative</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-[#99FF69]">HiiiWAV 50</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-300">Creative Collective Fund</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {fund.tagline}. Endowment + real estate + community ownership powering Oakland&apos;s creative ecosystem.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6">
              <a href="#partner">Partner With Us</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            The <span className="text-[#99FF69]">Vision</span>
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none text-center">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              HiiiWAV 50 is a new model for supporting artists—not just with grants, but with 
              <span className="text-[#99FF69]"> housing</span>, 
              <span className="text-[#A34DFF]"> ownership</span>, and 
              <span className="text-white font-semibold"> long-term infrastructure</span>.
            </p>
            
            <p className="text-lg text-gray-400">
              We&apos;re building a fund that combines philanthropic capital, real estate, and community governance 
              to support 50 artists with everything they need to build sustainable creative careers in Oakland.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99FF69]/20 mb-4">
                <Wallet className="w-8 h-8 text-[#99FF69]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Endowment</h3>
              <p className="text-gray-400">
                Permanent capital generating returns to fund artist grants, programs, and operations forever.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A34DFF]/20 mb-4">
                <Home className="w-8 h-8 text-[#A34DFF]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real Estate</h3>
              <p className="text-gray-400">
                Artist housing and creative spaces owned by the community, not landlords.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D16]/20 mb-4">
                <Users className="w-8 h-8 text-[#FF4D16]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Governance</h3>
              <p className="text-gray-400">
                Artists have voice and ownership in decisions that affect their lives and work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-900">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How It <span className="text-[#99FF69]">Works</span>
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            HiiiWAV 50 uses full-spectrum capital—multiple types of funding working together to maximize impact.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {fund.capitalPaths?.map((path) => {
              const icons = {
                give: <Heart className="w-8 h-8" />,
                lend: <Building2 className="w-8 h-8" />,
                invest: <TrendingUp className="w-8 h-8" />,
                guarantee: <Shield className="w-8 h-8" />,
                other: <Sparkles className="w-8 h-8" />,
              };
              const colors = {
                give: "text-[#99FF69] bg-[#99FF69]/20 border-[#99FF69]",
                lend: "text-[#A34DFF] bg-[#A34DFF]/20 border-[#A34DFF]",
                invest: "text-[#FF4D16] bg-[#FF4D16]/20 border-[#FF4D16]",
                guarantee: "text-white bg-white/20 border-white",
                other: "text-gray-400 bg-gray-400/20 border-gray-400",
              };
              
              return (
                <div 
                  key={path.id} 
                  className={`bg-black border-2 rounded-xl p-6 hover:scale-105 transition-transform ${colors[path.kind].split(' ')[2]}`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${colors[path.kind].split(' ').slice(0, 2).join(' ')}`}>
                    {icons[path.kind]}
                  </div>
                  <h3 className="text-xl font-bold mb-2 uppercase">{path.kind}</h3>
                  <p className="text-lg font-medium text-white mb-2">{path.label}</p>
                  <p className="text-gray-400 text-sm mb-4">{path.description}</p>
                  {path.minAmount && (
                    <p className="text-xs text-gray-500">
                      Starting at ${path.minAmount.toLocaleString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Powered by HiiiWAV 50 */}
      <section className="py-24 bg-black">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Powered by <span className="text-[#99FF69]">HiiiWAV 50</span>
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            The fund enables our ecosystem of projects, programs, and partnerships.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PROJECTS_SEED.map((project) => (
              <Link 
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors"
              >
                <div className="text-xs font-medium text-[#A34DFF] uppercase tracking-wide mb-2">
                  {project.type}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#99FF69] transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.shortTagline}
                </p>
                <div className="flex items-center text-[#99FF69] text-sm font-medium">
                  Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Joint Ventures */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Joint Ventures</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {JOINT_VENTURES_SEED.map((jv) => (
                <Link
                  key={jv.slug}
                  href={`/joint-ventures/${jv.slug}`}
                  className="bg-black border border-gray-700 rounded-full px-5 py-2 text-sm hover:border-[#99FF69] hover:text-[#99FF69] transition-colors"
                >
                  {jv.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <div className="text-6xl md:text-8xl font-bold text-[#99FF69] mb-4">
            ${(fund.targetAmount! / 1000000).toFixed(0)}M
          </div>
          <p className="text-xl text-gray-300 mb-2">Fund Target</p>
          <p className="text-gray-500 max-w-xl mx-auto">
            To support 50 artists with grants, housing, services, and ownership over the next decade.
          </p>
        </div>
      </section>

      {/* Partner CTA */}
      <section id="partner" className="py-24 bg-black">
        <div className="container px-4 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partner With <span className="text-[#99FF69]">HiiiWAV 50</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you want to give, lend, invest, or guarantee—there&apos;s a way to be part of building 
            Oakland&apos;s creative future.
          </p>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-400 mb-6">
              Schedule a conversation with our team to learn more about partnership opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
                <a href="mailto:fund@hiiiwav.org">Email Us</a>
              </Button>
              <Button asChild size="lg" className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
                <a href="/support">Other Ways to Support</a>
              </Button>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm">
            HiiiWAV is a 501(c)(3) nonprofit organization. Gifts are tax-deductible to the extent allowed by law.
          </p>
        </div>
      </section>
    </div>
  );
}



