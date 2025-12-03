import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Music, Users, Sparkles } from "lucide-react";
import { JOINT_VENTURES_SEED } from "@/lib/types";

// Map JV slugs to images
const jvImages: Record<string, string> = {
  "choice-scores": "/media/images/Kev-Choice.png",
  "ryan-nicole": "/media/images/RyanNicole.png",
  "prospect-band": "/media/images/Prospect.png",
  "alphabet-rockers": "/media/images/Alphabet-Rockers.png",
  "sol-affirmations": "/media/images/HiiiWAV-Fest.png",
  "soul-slappers": "/media/images/Dame-Drummer.png",
};

export async function generateStaticParams() {
  return JOINT_VENTURES_SEED.map((jv) => ({
    slug: jv.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jv = JOINT_VENTURES_SEED.find((j) => j.slug === slug);
  
  if (!jv) {
    return { title: "Not Found - HiiiWAV" };
  }
  
  return {
    title: `${jv.name} - Joint Venture - HiiiWAV`,
    description: jv.description,
  };
}

export default async function JointVenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jv = JOINT_VENTURES_SEED.find((j) => j.slug === slug);
  
  if (!jv) {
    notFound();
  }
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Back Link */}
      <div className="container px-4 pt-8">
        <Link 
          href="/joint-ventures" 
          className="inline-flex items-center text-gray-400 hover:text-[#99FF69] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Joint Ventures
        </Link>
      </div>
      
      {/* Hero */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Image */}
            <div className="aspect-square rounded-xl overflow-hidden">
              {jvImages[jv.slug] ? (
                <img 
                  src={jvImages[jv.slug]}
                  alt={jv.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#A34DFF]/30 to-[#99FF69]/30 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/50">{jv.name[0]}</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-4 py-2 mb-4">
                <Users className="w-4 h-4 text-[#99FF69]" />
                <span className="text-[#99FF69] text-sm font-medium">Joint Venture</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {jv.name}
              </h1>
              
              <div className={`inline-block rounded-full px-3 py-1 text-sm font-medium mb-6 ${
                jv.status === "current" 
                  ? "bg-[#99FF69] text-black" 
                  : "bg-gray-700 text-gray-300"
              }`}>
                {jv.status === "current" ? "Active Partner" : "Alumni"}
              </div>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {jv.description}
              </p>
              
              {/* Focus Areas */}
              <div className="flex flex-wrap gap-2 mb-8">
                {jv.focusAreas.map((area) => (
                  <span key={area} className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm">
                    {area}
                  </span>
                ))}
              </div>
              
              {/* Partners */}
              {jv.partners.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-2">Partners</h3>
                  <p className="text-lg">{jv.partners.join(", ")}</p>
                </div>
              )}
              
              {/* Links */}
              {jv.projectLinks && jv.projectLinks.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {jv.projectLinks.map((link, i) => (
                    <Button key={i} asChild variant="outline" className="border-gray-700 hover:border-[#99FF69]">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About the Partnership */}
      <section className="py-20 bg-gray-900">
        <div className="container px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            About the <span className="text-[#99FF69]">Partnership</span>
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300">
              As a HiiiWAV Joint Venture, {jv.name} receives nonprofit infrastructure, 
              community support, and access to the broader HiiiWAV ecosystem. This partnership 
              enables them to focus on their creative work while we handle the back-office 
              operations.
            </p>
            
            <p className="text-gray-400">
              Joint Ventures are a core part of the HiiiWAV 50 Creative Collective Fund model. 
              By supporting HiiiWAV, funders and sponsors also support the artists and 
              organizations in our JV roster.
            </p>
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-black">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-black border-2 border-[#99FF69] text-[#99FF69] hover:bg-[#99FF69] hover:text-black font-semibold">
              <Link href="/joint-ventures">All Joint Ventures</Link>
            </Button>
            <Button asChild className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <Link href="/fund">HiiiWAV 50 Fund</Link>
            </Button>
            <Button asChild className="bg-black border-2 border-white text-white hover:bg-white hover:text-black font-semibold">
              <Link href="/projects/hiiiwav-fest">HiiiWAV FEST</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Support {jv.name}</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Donations to HiiiWAV can be directed to support specific Joint Ventures. 
            Contact us to learn more about supporting {jv.name} directly.
          </p>
          <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
            <Link href="/donate">Donate to HiiiWAV</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}



