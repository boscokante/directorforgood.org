import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield, FileText, Bot, DollarSign, Clock, Target, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDeckContent } from "@/lib/deck-content-server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = getDeckContent();
  
  // Helper to find a slide by ID
  const getSlide = (id: string) => content.slides.find(s => s.id === id);

  return (
    <div className="bg-black text-white min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative z-10 container text-center px-4 py-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            {content.cover.title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light max-w-4xl mx-auto">
            {content.cover.tagline}
          </p>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            {content.cover.subtagline}
          </p>
          <p className="text-lg text-gray-500 mb-8">{content.cover.url}</p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8 py-6"
            >
              <a href="#contact">Get Started</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-900 hover:border-white text-lg px-8 py-6"
            >
              <a href="#solution">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem 1: Founders Are the Whole Leadership Team */}
      {(() => {
        const slide = getSlide('problem-founders');
        if (!slide) return null;
        return (
          <section id="problem" className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl md:text-3xl text-gray-300 mb-12">
                  {slide.subtitle}
                </p>
                {slide.sections?.map((section, i) => (
                  <div key={i}>
                    {section.heading && <p className="text-xl text-gray-400 mb-8">{section.heading}</p>}
                    {section.items && (
                      <ul className="space-y-4 text-lg text-gray-300 mb-8">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {(slide.footnote || slide.highlight) && (
                  <p className="text-xl text-gray-300 mt-8">
                    {slide.footnote} {slide.highlight}
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Problem 2: Downshifted Orgs */}
      {(() => {
        const slide = getSlide('problem-downshifted');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {slide.sections?.slice(0, 2).map((section, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold mb-4 text-white">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-3 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {slide.footnote && <p className="text-xl text-gray-300 mt-8">{slide.footnote}</p>}
                {slide.highlight && (
                  <p className="text-2xl text-white font-semibold mt-6">{slide.highlight}</p>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Ideal Customer: Foundations as Buyers */}
      {(() => {
        const slide = getSlide('customer-foundations');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {slide.sections?.map((section, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold mb-4 text-white">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-3 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {slide.highlight && (
                  <p className="text-2xl text-white font-semibold mt-6">{slide.highlight}</p>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Market Opportunity */}
      {(() => {
        const slide = getSlide('market');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-8 mb-12">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className="bg-black/50 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold mb-4 text-white">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-3 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {slide.highlight && (
                  <p className="text-2xl text-white font-semibold text-center mb-4">{slide.highlight}</p>
                )}
                {slide.footnote && (
                  <p className="text-sm text-gray-500 text-center">{slide.footnote}</p>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Broken Options */}
      {(() => {
        const slide = getSlide('broken-options');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-8 mb-12">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className="border-l-4 border-gray-700 pl-6">
                      <h3 className="text-2xl font-semibold mb-3">{section.heading}</h3>
                      {section.text && <p className="text-gray-300">{section.text}</p>}
                      {section.items && (
                        <ul className="text-gray-300 space-y-1 ml-4">
                          {section.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.highlight && <p className="text-xl text-gray-300">{slide.highlight}</p>}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Director - What We Are */}
      {(() => {
        const slide = getSlide('what-we-are');
        if (!slide) return null;
        return (
          <section id="solution" className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-2xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-8 mb-12">
                  {slide.sections?.map((section, i) => (
                    <div key={i}>
                      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                        {i === 0 ? <Shield className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                        {section.heading}
                      </h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300 ml-11">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.highlight && <p className="text-xl text-gray-300">{slide.highlight}</p>}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Fundraising Philosophy */}
      {(() => {
        const slide = getSlide('fundraising-philosophy');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {slide.sections?.slice(0, 2).map((section, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold mb-4 text-white">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.sections?.[2] && (
                  <div className="border-l-4 border-white pl-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">{slide.sections[2].heading}</h3>
                    {slide.sections[2].items && (
                      <ul className="space-y-2 text-gray-300">
                        {slide.sections[2].items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                
                {slide.highlight && <p className="text-xl text-gray-300">{slide.highlight}</p>}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Director Pod - Capacity Ramp */}
      {(() => {
        const slide = getSlide('director-pod');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-12">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-2xl font-semibold mb-4">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                      {section.text && <p className="text-gray-300">{section.text}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Director OS - Product Overview */}
      {(() => {
        const slide = getSlide('director-os');
        if (!slide) return null;
        const icons = [TrendingUp, DollarSign, Shield, FileText];
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-2xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {slide.sections?.map((section, i) => {
                    const Icon = icons[i] || Shield;
                    return (
                      <div key={i} className="border border-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Icon className="w-6 h-6" />
                          {section.heading}
                        </h3>
                        {section.text && <p className="text-gray-300">{section.text}</p>}
                      </div>
                    );
                  })}
                </div>
                
                {slide.footnote && <p className="text-lg text-gray-400">{slide.footnote}</p>}
              </div>
            </div>
          </section>
        );
      })()}

      {/* AI Agents */}
      {(() => {
        const slide = getSlide('ai-agents');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-6 mb-8">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className="border-l-4 border-white pl-6">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Bot className="w-6 h-6" />
                        {section.heading}
                      </h3>
                      {section.items && (
                        <ul className="space-y-1 text-gray-300 ml-8">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.highlight && (
                  <div className="border border-gray-700 rounded-lg p-6 bg-black/50">
                    <p className="text-lg text-gray-300">{slide.highlight}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Economics */}
      {(() => {
        const slide = getSlide('economics');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className={`border rounded-lg p-6 ${i === 1 ? 'border-white bg-gray-900' : 'border-gray-700'}`}>
                      <h3 className="text-xl font-semibold mb-4">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.footnote && <p className="text-lg text-gray-300">{slide.footnote}</p>}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Why Now */}
      {(() => {
        const slide = getSlide('why-now');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="space-y-8">
                  {slide.sections?.map((section, i) => (
                    <div key={i}>
                      <h3 className="text-2xl font-semibold mb-4">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {slide.highlight && (
                  <div className="border-l-4 border-white pl-6 mt-8">
                    <p className="text-xl text-gray-300">{slide.highlight}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Go-to-Market */}
      {(() => {
        const slide = getSlide('go-to-market');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                
                <div className="space-y-6 mb-8">
                  {slide.sections?.slice(0, 3).map((section, i) => (
                    <div key={i} className="border-l-4 border-gray-700 pl-6">
                      <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
                      {section.text && <p className="text-gray-300">{section.text}</p>}
                    </div>
                  ))}
                </div>
                
                {slide.sections?.[3] && (
                  <div className="border border-gray-700 rounded-lg p-6 bg-gray-900">
                    <h3 className="text-xl font-semibold mb-4">{slide.sections[3].heading}</h3>
                    {slide.sections[3].items && (
                      <ul className="space-y-2 text-gray-300">
                        {slide.sections[3].items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Business Model */}
      {(() => {
        const slide = getSlide('business-model');
        if (!slide) return null;
        return (
          <section className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                
                <div className="space-y-6 mb-8">
                  {slide.sections?.map((section, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-semibold mb-3">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Strategic Partners & Structure */}
      {(() => {
        const slide = getSlide('strategic-partners');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-12">{slide.subtitle}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {slide.sections?.slice(0, 2).map((section, i) => (
                    <div key={i} className="border border-gray-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-white">{section.heading}</h3>
                      {section.items && (
                        <ul className="space-y-3 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Governance section */}
                {slide.sections?.[2] && (
                  <div className="border border-gray-600 rounded-lg p-6 bg-gray-900 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">{slide.sections[2].heading}</h3>
                    {slide.sections[2].items && (
                      <ul className="space-y-3 text-gray-300">
                        {slide.sections[2].items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {slide.highlight && (
                  <p className="text-xl text-white font-semibold text-center">{slide.highlight}</p>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Team */}
      {(() => {
        const slide = getSlide('team');
        if (!slide) return null;
        return (
          <section className="py-20 bg-black">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                
                {/* Team Members with Photos */}
                {slide.teamMembers && (
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {slide.teamMembers.map((member: { name: string; role: string; bio: string; image: string }, i: number) => (
                      <div key={i} className="flex gap-6 items-start">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-2 border-gray-700"
                        />
                        <div>
                          <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                          <p className="text-lg text-gray-400 mb-2">{member.role}</p>
                          <p className="text-gray-300 text-sm">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Open Roles */}
                <h3 className="text-2xl font-semibold mb-6 text-gray-400">Open Roles</h3>
                <div className="space-y-6 mb-8">
                  {slide.sections?.map((section, i) => (
                    <div key={i} className="border-l-4 border-gray-700 pl-6">
                      <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
                      {section.text && <p className="text-gray-300">{section.text}</p>}
                    </div>
                  ))}
                </div>
                
                {slide.footnote && (
                  <div className="border border-gray-700 rounded-lg p-6 bg-gray-900">
                    <p className="text-lg text-gray-300">{slide.footnote}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Roadmap & Ask */}
      {(() => {
        const slide = getSlide('roadmap');
        if (!slide) return null;
        return (
          <section id="contact" className="py-20 bg-gray-900">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{slide.title}</h2>
                
                <div className="space-y-8 mb-12">
                  <h3 className="text-2xl font-semibold mb-4">Roadmap</h3>
                  
                  {slide.sections?.map((section, i) => (
                    <div key={i} className={`border-l-4 pl-6 mb-6 ${i === 0 ? 'border-white' : 'border-gray-700'}`}>
                      <h4 className="text-xl font-semibold mb-3">{section.heading}</h4>
                      {section.items && (
                        <ul className="space-y-2 text-gray-300">
                          {section.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* The Ask */}
                <div className="border border-white rounded-lg p-6 bg-black">
                  <h3 className="text-2xl font-semibold mb-4">Ask</h3>
                  <p className="text-4xl font-bold text-white mb-4">{content.ask.amount}</p>
                  <ul className="space-y-2 text-gray-300">
                    {content.ask.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your <span className="text-white">Backbone?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let&apos;s talk about how Director can help your organization scale.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold text-lg px-8 py-6"
            >
              <a href="mailto:hello@directorforgood.org">Get in Touch</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <a href="#solution">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
