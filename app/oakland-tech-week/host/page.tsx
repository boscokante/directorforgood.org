"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, 
  Users, 
  Sparkles, 
  Building2, 
  Wifi, 
  Car, 
  Accessibility, 
  ChefHat, 
  Trees, 
  Monitor,
  Check,
  ArrowLeft,
  Loader2
} from "lucide-react"

const SPACE_TYPES = [
  { value: 'gallery', label: 'Gallery / Art Space' },
  { value: 'office', label: 'Office' },
  { value: 'warehouse', label: 'Warehouse / Industrial' },
  { value: 'restaurant', label: 'Restaurant / Bar' },
  { value: 'outdoor', label: 'Outdoor Space' },
  { value: 'studio', label: 'Recording / Creative Studio' },
  { value: 'coworking', label: 'Coworking Space' },
  { value: 'event_space', label: 'Event Venue' },
  { value: 'other', label: 'Other' },
]

const AMENITIES = [
  { value: 'wifi', label: 'WiFi', icon: Wifi },
  { value: 'av_equipment', label: 'A/V Equipment', icon: Monitor },
  { value: 'parking', label: 'Parking', icon: Car },
  { value: 'accessible', label: 'Accessible', icon: Accessibility },
  { value: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { value: 'outdoor_space', label: 'Outdoor Space', icon: Trees },
]

const NEIGHBORHOODS = [
  'Downtown',
  'Uptown',
  'Jack London',
  'Temescal',
  'Rockridge',
  'West Oakland',
  'East Oakland',
  'Fruitvale',
  'Lake Merritt',
  'Grand Lake',
  'Piedmont Ave',
  'Other',
]

export default function HostSignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      contactName: formData.get('contactName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      venueName: formData.get('venueName') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string || 'Oakland',
      neighborhood: formData.get('neighborhood') as string,
      capacity: formData.get('capacity') ? parseInt(formData.get('capacity') as string) : undefined,
      spaceType: formData.get('spaceType') as string,
      availability: formData.get('availability') as string,
      amenities: selectedAmenities,
      website: formData.get('website') as string,
      instagramHandle: formData.get('instagramHandle') as string,
      notes: formData.get('notes') as string,
    }

    try {
      const res = await fetch('/api/venue-hosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Something went wrong')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  if (isSubmitted) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#99FF69]/20 mb-6">
            <Check className="w-10 h-10 text-[#99FF69]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">You&apos;re In!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thanks for signing up to host Oakland Tech Week. We&apos;ll be in touch soon to discuss 
            how your space can be part of the action.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold">
              <Link href="/projects/oakland-tech-week">Back to Oakland Tech Week</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-[#99FF69]/10" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="relative z-10 container px-4 max-w-4xl mx-auto">
          <Link 
            href="/projects/oakland-tech-week" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Oakland Tech Week
          </Link>
          
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2 mb-6">
            <Building2 className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300 font-medium">Venue Host Application</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Host Oakland<br />
            <span className="text-[#99FF69]">Tech Week</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Open your doors to Oakland&apos;s tech and creative community. Share your space and 
            be part of something bigger.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why <span className="text-[#99FF69]">Host?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/20 mb-4">
                <Users className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Community Connection</h3>
              <p className="text-gray-400 text-sm">
                Connect with Oakland&apos;s most innovative technologists, artists, and founders.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/20 mb-4">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Visibility & Exposure</h3>
              <p className="text-gray-400 text-sm">
                Get featured across OTW marketing and bring new audiences to your venue.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#99FF69]/20 mb-4">
                <MapPin className="w-7 h-7 text-[#99FF69]" />
              </div>
              <h3 className="text-lg font-bold mb-2">Put Oakland On</h3>
              <p className="text-gray-400 text-sm">
                Help showcase the best of Oakland to the world. Rep your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Sign Up Your Venue</h2>
            <p className="text-gray-400 mb-8">
              Fill out the form below and we&apos;ll reach out to discuss event opportunities.
            </p>

            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6 text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#99FF69]">Contact Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <Input 
                      id="contactName" 
                      name="contactName" 
                      required 
                      className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                      placeholder="jane@venue.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                    placeholder="(510) 555-0123"
                  />
                </div>
              </div>

              {/* Venue Info */}
              <div className="space-y-4 pt-4 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-[#99FF69]">Venue Details</h3>
                
                <div>
                  <label htmlFor="venueName" className="block text-sm font-medium mb-2">
                    Venue Name <span className="text-red-400">*</span>
                  </label>
                  <Input 
                    id="venueName" 
                    name="venueName" 
                    required 
                    className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                    placeholder="The Oakland Space"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Address <span className="text-red-400">*</span>
                  </label>
                  <Input 
                    id="address" 
                    name="address" 
                    required 
                    className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                    placeholder="123 Broadway, Oakland CA 94607"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="neighborhood" className="block text-sm font-medium mb-2">Neighborhood</label>
                    <select 
                      id="neighborhood" 
                      name="neighborhood" 
                      className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#99FF69] focus:ring-[#99FF69] focus:outline-none"
                    >
                      <option value="">Select neighborhood</option>
                      {NEIGHBORHOODS.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium mb-2">Capacity</label>
                    <Input 
                      id="capacity" 
                      name="capacity" 
                      type="number" 
                      min="1"
                      className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                      placeholder="50"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="spaceType" className="block text-sm font-medium mb-2">Type of Space</label>
                  <select 
                    id="spaceType" 
                    name="spaceType" 
                    className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#99FF69] focus:ring-[#99FF69] focus:outline-none"
                  >
                    <option value="">Select type</option>
                    {SPACE_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleAmenity(value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-sm ${
                          selectedAmenities.includes(value)
                            ? 'bg-[#99FF69]/20 border-[#99FF69] text-[#99FF69]'
                            : 'bg-black border-gray-700 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability & Additional */}
              <div className="space-y-4 pt-4 border-t border-gray-800">
                <h3 className="text-lg font-semibold text-[#99FF69]">Availability & More</h3>
                
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium mb-2">
                    When is your space available?
                  </label>
                  <Textarea 
                    id="availability" 
                    name="availability" 
                    className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69] min-h-[80px]"
                    placeholder="e.g., Weekday evenings after 6pm, weekends all day..."
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium mb-2">Website</label>
                    <Input 
                      id="website" 
                      name="website" 
                      type="url" 
                      className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                      placeholder="https://yourvenue.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="instagramHandle" className="block text-sm font-medium mb-2">Instagram</label>
                    <Input 
                      id="instagramHandle" 
                      name="instagramHandle" 
                      className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69]"
                      placeholder="@yourvenue"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-2">
                    Anything else we should know?
                  </label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    className="bg-black border-gray-700 focus:border-[#99FF69] focus:ring-[#99FF69] min-h-[100px]"
                    placeholder="Tell us about your space, what types of events you'd like to host, etc."
                  />
                </div>
              </div>

              <input type="hidden" name="city" value="Oakland" />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#99FF69] text-black hover:bg-[#7ACC54] font-bold text-lg py-6 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-900/30">
        <div className="container px-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">What kind of events happen at OTW?</h3>
              <p className="text-gray-400">
                Everything from tech panels and startup demos to art shows, DJ sets, and networking events. 
                We&apos;ll work with you to find the right fit for your space.
              </p>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Is there a cost to be a host?</h3>
              <p className="text-gray-400">
                No! We&apos;re looking for partners who want to contribute their space. In return, you get 
                exposure to the OTW community and can co-brand events with us.
              </p>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">When does Oakland Tech Week happen?</h3>
              <p className="text-gray-400">
                Oakland Tech Week typically takes place in the fall. We&apos;ll share exact dates once 
                they&apos;re confirmed and coordinate with you on scheduling.
              </p>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">What if I have a small space?</h3>
              <p className="text-gray-400">
                All sizes welcome! Intimate venues are great for workshops, small panels, and networking 
                sessions. We have events for every size space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4 text-center">
          <p className="text-gray-400 mb-4">Part of the HiiiWAV ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects/oakland-tech-week" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Oakland Tech Week
            </Link>
            <Link href="/projects/code-vibes" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              Code Vibes
            </Link>
            <Link href="/" className="bg-black/50 border border-gray-700 rounded-full px-5 py-2 hover:border-[#99FF69] hover:text-[#99FF69] transition-colors">
              HiiiWAV Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}




