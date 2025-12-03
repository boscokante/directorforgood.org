import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { PROJECTS_SEED } from "@/lib/types";

export const metadata = {
  title: "Projects - HiiiWAV",
  description: "Explore HiiiWAV's ecosystem of projects: Oakland Tech Week, Code Vibes, HiiiWAV FEST, and more. All powered by HiiiWAV 50.",
};

const projectImages: Record<string, string> = {
  "oakland-tech-week": "/media/images/HiiiWAV-Fest.png",
  "code-vibes": "/media/images/Afro-AI-website-banner-2048x2048.png",
  "hiiiwav-fest": "/media/images/HiiiWAV-Fest.png",
};

const projectColors: Record<string, string> = {
  "oakland-tech-week": "from-blue-600/30 to-purple-600/30",
  "code-vibes": "from-[#A34DFF]/30 to-[#99FF69]/30",
  "hiiiwav-fest": "from-[#FF4D16]/30 to-[#99FF69]/30",
};

export default function ProjectsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#99FF69]" />
            <span className="text-[#99FF69] font-medium">Powered by HiiiWAV 50</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-[#99FF69]">Projects</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            HiiiWAV produces projects and experiences that empower artists, founders, and communities 
            at the intersection of culture and technology.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PROJECTS_SEED.map((project) => (
              <Link 
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-[#99FF69] transition-all hover:scale-[1.02]"
              >
                {/* Image/Gradient Background */}
                <div className={`aspect-video bg-gradient-to-br ${projectColors[project.slug] || "from-gray-800 to-gray-900"} relative overflow-hidden`}>
                  {projectImages[project.slug] && (
                    <img 
                      src={projectImages[project.slug]}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-gray-700 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide">
                    {project.type}
                  </div>
                  
                  {/* Primary Badge */}
                  {project.isPrimary && (
                    <div className="absolute top-4 right-4 bg-[#99FF69] text-black rounded-full px-3 py-1 text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-[#99FF69] transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {project.shortTagline}
                  </p>
                  
                  <div className="flex items-center text-[#99FF69] font-medium">
                    Learn more 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Joint Ventures CTA */}
      <section className="py-16 bg-black">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Joint Ventures</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            We also partner with artists and organizations through our Joint Ventures program—boutique, 
            label-like partnerships that provide infrastructure and support.
          </p>
          <Button asChild className="bg-black border-2 border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black font-semibold">
            <Link href="/joint-ventures">
              Explore Joint Ventures <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Fund CTA */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <p className="text-[#99FF69] font-medium mb-4">All projects powered by</p>
          <h2 className="text-4xl font-bold mb-4">HiiiWAV 50 Creative Collective Fund</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Our flagship fund model combining endowment, real estate, and full-spectrum capital 
            to support artists for the long term.
          </p>
          <Button asChild className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
            <Link href="/fund">Learn About the Fund</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}



