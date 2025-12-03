import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Rocket, Code, Bot, Zap } from "lucide-react";

export const metadata = {
  title: "Code Vibes - HiiiWAV",
  description: "Agents are for artists. Agents are for activists. Agents are for all of us. Learn to build software and AI agents with HiiiWAV's Code Vibes program.",
};

export default function CodeVibesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A34DFF]/30 via-black to-[#99FF69]/20" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#99FF69 1px, transparent 1px), linear-gradient(90deg, #99FF69 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#99FF69]/20 border border-[#99FF69]/40 rounded-full px-4 py-2 mb-6">
            <Bot className="w-5 h-5 text-[#99FF69]" />
            <span className="text-[#99FF69] font-medium">New Program</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-[#99FF69]">Code</span> Vibes
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Agents are for <span className="text-[#A34DFF]">artists</span>.
          </p>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Agents are for <span className="text-[#FF4D16]">activists</span>.
          </p>
          <p className="text-2xl md:text-3xl text-white mb-8 font-semibold">
            Agents are for <span className="text-[#99FF69]">all of us</span>.
          </p>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Learn to build software and AI agents that amplify your impact. 
            No coding experience required.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6">
              <Link href="#apply">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6">
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Code Vibes */}
      <section id="learn-more" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            What is <span className="text-[#99FF69]">Code Vibes</span>?
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Code Vibes is HiiiWAV&apos;s flagship program teaching creators, activists, and changemakers 
            how to build AI-powered tools and software agents that serve their communities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-black border border-[#A34DFF] rounded-xl p-8 text-center hover:border-[#99FF69] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A34DFF]/20 mb-6">
                <Code className="w-8 h-8 text-[#A34DFF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Build Software</h3>
              <p className="text-gray-400">
                Learn to create apps, websites, and tools—no prior coding experience needed. 
                We start from scratch.
              </p>
            </div>
            
            <div className="bg-black border border-[#A34DFF] rounded-xl p-8 text-center hover:border-[#99FF69] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99FF69]/20 mb-6">
                <Bot className="w-8 h-8 text-[#99FF69]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Create AI Agents</h3>
              <p className="text-gray-400">
                Master the art of building AI agents that automate tasks, answer questions, 
                and amplify your work.
              </p>
            </div>
            
            <div className="bg-black border border-[#A34DFF] rounded-xl p-8 text-center hover:border-[#99FF69] transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D16]/20 mb-6">
                <Rocket className="w-8 h-8 text-[#FF4D16]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Launch Products</h3>
              <p className="text-gray-400">
                Go from idea to launched product. Build real tools that serve your 
                community and create impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 bg-gray-900">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Who is Code Vibes <span className="text-[#99FF69]">for</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "🎨", title: "Artists", desc: "Musicians, visual artists, and creators ready to build tools for their craft" },
              { icon: "✊", title: "Activists", desc: "Community organizers and changemakers who want to amplify their impact" },
              { icon: "🎤", title: "Storytellers", desc: "Writers, podcasters, and content creators looking to leverage AI" },
              { icon: "💡", title: "Entrepreneurs", desc: "Anyone with an idea who wants to turn it into a working product" },
            ].map((item) => (
              <div key={item.title} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-[#99FF69] transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-24 bg-black">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            What You&apos;ll <span className="text-[#99FF69]">Learn</span>
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            A comprehensive curriculum designed to take you from zero to building real AI-powered products.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { week: "1-2", title: "Foundations", topics: ["How software works", "Introduction to AI", "Setting up your toolkit", "Your first simple app"] },
              { week: "3-4", title: "Building with AI", topics: ["Understanding AI models", "Prompting techniques", "Building chatbots", "AI-assisted coding"] },
              { week: "5-6", title: "Creating Agents", topics: ["What are AI agents", "Agent architectures", "Automating workflows", "Building your first agent"] },
              { week: "7-8", title: "Launch & Scale", topics: ["Deploying your product", "Getting users", "Iterating based on feedback", "Monetization strategies"] },
            ].map((module) => (
              <div key={module.week} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-[#99FF69] text-sm font-medium mb-2">Weeks {module.week}</div>
                <h3 className="text-xl font-bold mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-gray-400">
                      <Zap className="w-4 h-4 text-[#99FF69]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Program <span className="text-[#99FF69]">Details</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-[#99FF69] mb-2">8</div>
                <div className="text-gray-400">Weeks</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#99FF69] mb-2">2x</div>
                <div className="text-gray-400">Sessions/Week</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#99FF69] mb-2">Free</div>
                <div className="text-gray-400">For Accepted Applicants</div>
              </div>
            </div>
            
            <div className="mt-16 bg-black border border-[#A34DFF] rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What&apos;s Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Live instruction from industry experts",
                  "Hands-on projects and assignments",
                  "1-on-1 mentorship sessions",
                  "Access to AI tools and resources",
                  "Community of fellow builders",
                  "Certificate of completion",
                  "Demo day to showcase your work",
                  "Ongoing alumni support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#99FF69] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-24 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build the <span className="text-[#99FF69]">Future</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Applications are now open for our next cohort. No coding experience required—just 
            bring your curiosity and ideas.
          </p>
          <p className="text-lg text-[#99FF69] mb-8">
            Next cohort starts soon. Limited spots available.
          </p>
          
          <Button asChild size="lg" className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-xl px-12 py-6">
            <a href="https://forms.gle/your-application-form" target="_blank" rel="noopener noreferrer">
              Apply to Code Vibes
            </a>
          </Button>
          
          <p className="text-gray-500 mt-6 text-sm">
            Have questions? Email us at <a href="mailto:info@hiiiwav.org" className="text-[#99FF69] hover:underline">info@hiiiwav.org</a>
          </p>
        </div>
      </section>

      {/* Legacy Note */}
      <section className="py-12 bg-black border-t border-gray-800">
        <div className="container px-4 text-center">
          <p className="text-gray-500 text-sm">
            Code Vibes builds on the legacy of our{" "}
            <Link href="/afro-ai-2" className="text-[#99FF69] hover:underline">
              AFRO AI program
            </Link>
            , which supported artists in building AI-powered music tech startups.
          </p>
        </div>
      </section>
    </div>
  );
}




