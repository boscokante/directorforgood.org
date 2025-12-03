import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Music, Rocket, Bot, Calendar } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch latest blog posts
  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(3);

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />

      {/* Hero Section with Video */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/media/videos/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        {/* Content */}
        <div className="relative z-10 container text-center px-4">
          <Image
            src="/logo-white.png"
            alt="HiiiWAV"
            width={300}
            height={80}
            className="h-16 md:h-20 w-auto mx-auto mb-8"
            priority
          />

          <p className="text-2xl md:text-4xl text-gray-200 mb-4 font-light tracking-wide">
            Creative Tech Incubator
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6"
            >
              <Link href="/code-vibes">Apply to Code Vibes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Link href="/donate">Support Us</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-black">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Empowering <span className="text-[#99FF69]">artists</span> to become{" "}
              <span className="text-[#A34DFF]">entrepreneurs</span> through technology
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              HiiiWAV is Oakland&apos;s creative tech incubator, providing artists, activists, and 
              creators with the tools, mentorship, and community they need to build successful 
              tech-enabled ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#99FF69]">Programs</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From learning to build software to launching at HiiiWAV Fest, we support creators at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Code Vibes */}
            <Link
              href="/code-vibes"
              className="group bg-black border border-gray-800 rounded-2xl p-8 hover:border-[#99FF69] transition-all hover:scale-[1.02]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#99FF69]/20 mb-6">
                <Bot className="w-7 h-7 text-[#99FF69]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#99FF69] transition-colors">
                Code Vibes
              </h3>
              <p className="text-gray-400 mb-4">
                Learn to build software and AI agents. Agents are for artists, activists, and all of us.
              </p>
              <span className="text-[#99FF69] font-medium flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            {/* HiiiFrequency */}
            <Link
              href="/joint-ventures"
              className="group bg-black border border-gray-800 rounded-2xl p-8 hover:border-[#A34DFF] transition-all hover:scale-[1.02]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#A34DFF]/20 mb-6">
                <Music className="w-7 h-7 text-[#A34DFF]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#A34DFF] transition-colors">
                HiiiFrequency
              </h3>
              <p className="text-gray-400 mb-4">
                Residency program for award-winning businesses created by HiiiWAV artists.
              </p>
              <span className="text-[#A34DFF] font-medium flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            {/* Events */}
            <Link
              href="/projects/hiiiwav-fest"
              className="group bg-black border border-gray-800 rounded-2xl p-8 hover:border-[#FF4D16] transition-all hover:scale-[1.02]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#FF4D16]/20 mb-6">
                <Calendar className="w-7 h-7 text-[#FF4D16]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF4D16] transition-colors">
                Events
              </h3>
              <p className="text-gray-400 mb-4">
                Join us for HiiiWAV Fest, Demo Days, and community gatherings throughout the year.
              </p>
              <span className="text-[#FF4D16] font-medium flex items-center gap-2">
                View Events <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>

          {/* AFRO AI Legacy */}
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Building on the legacy of{" "}
              <Link href="/afro-ai-2" className="text-[#99FF69] hover:underline">
                AFRO AI Program →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-900">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest <span className="text-[#99FF69]">News</span>
            </h2>
            <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:border-[#99FF69] hover:text-[#99FF69]">
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-[#99FF69] transition-all"
                >
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#99FF69] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              // Placeholder cards if no posts
              <>
                {["HiiiWAV FEST 2024", "AFRO AI Residency", "Demo Day 2024"].map((title) => (
                  <div
                    key={title}
                    className="bg-black border border-gray-800 rounded-xl p-6"
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#A34DFF]/20 to-[#99FF69]/20 rounded-lg mb-4" />
                    <h3 className="text-xl font-bold">{title}</h3>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-black">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#99FF69] mb-2">50+</div>
              <div className="text-gray-400">Artists Supported</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#99FF69] mb-2">$500K+</div>
              <div className="text-gray-400">Funding Distributed</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#99FF69] mb-2">20+</div>
              <div className="text-gray-400">Events Hosted</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-[#99FF69] mb-2">1000+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#A34DFF]/20 to-[#99FF69]/20">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="text-[#99FF69]">Movement</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Support creators in building the future with technology.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg px-8 py-6"
            >
              <Link href="/code-vibes">Apply to Code Vibes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-6"
            >
              <Link href="/donate">Support Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
