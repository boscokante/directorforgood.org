import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../db/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })
const { newsletters } = schema

// Brand colors
const COLORS = {
  purple: '#A34DFF',
  green: '#99FF69',
  orange: '#E97451',
  coral: '#FF6B35',
  darkPurple: '#6B21A8',
  black: '#000000',
  darkGray: '#1a1a1a',
}

// Newsletters in REVERSE chronological order (most recent first)
const newsletterData = [
  {
    slug: 'hiiiwav-2024-afro-ai-mvp',
    title: 'AI For Liberation: AFRO AI MVP Recap',
    subtitle: "Founder's Note: The robots are here - and we're using them for liberation",
    excerpt: "From Kev Choice's $10,000 Grand Prize to being named a Doris Duke Foundation finalist, HiiiWAV is building the future of artist-owned technology.",
    issueNumber: 11,
    publishedAt: new Date('2024-09-15'),
    coverImage: '/logo-white.png',
    content: `
<div style="background: linear-gradient(135deg, #1a0533 0%, #0a0a0a 100%); padding: 60px 20px; text-align: center; border-radius: 12px; margin-bottom: 40px;">
  <img src="/logo-white.png" alt="HiiiWAV" style="max-width: 400px; margin: 0 auto;" />
  <p style="color: #99FF69; font-size: 1.5rem; margin-top: 20px;">HiiiLIGHTS Newsletter</p>
</div>

<div style="background: #E97451; padding: 60px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 30px;">Founder's Note:<br/>AI For Liberation</h2>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">Dear HiiiWAV Family,</p>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">The robots are here, and there's no denying the growing dread as AI churns out perfect imitations of chart-topping hits—without a single note played by human hands. How can we, flesh-and-blood musicians, compete in this assembly line dominated by machines? The truth is, we can't. But should we want to?</p>
  
  <div style="text-align: center; margin: 40px 0;">
    <img src="/newsletters/bosko-kante.jpg" alt="Bosko Kante, Founder of HiiiWAV" style="width: 300px; border-radius: 12px; border: 4px solid #A34DFF;" />
  </div>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">Major labels have long treated music like factory output, underpaying musicians for higher profits. I know this all too well. I'm in the middle of a <a href="https://www.complex.com/music/a/sam-reed/bosko-dua-lipa-levitating-lawsuit" style="color: #A34DFF; text-decoration: underline;">battle over Dua Lipa's "Levitating,"</a> a song likely generating over $20 million. Warner Records offered me just $1,500, forcing me into a costly legal fight for fair compensation. It's a broken system that's exploited creators from the beginning.</p>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;"><strong>Here's where AI changes the game for the better.</strong> Rather than fear it, we should use AI as a tool to escape the system. AI and the internet have torn down the cost barriers that made music creation, promotion, and distribution inaccessible. Now, we can reclaim our art and its future.</p>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">I'm proud of our AFRO AI program and its incredible artists like <strong>Kev Choice, Ryan Nicole, Jariatu Mansaray, and Meaghan Maples</strong>. They're not just using AI to copy—they're using it to liberate themselves. They are building companies, owning their tech, and shaping a future where creators thrive.</p>
  
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">With appreciation and excitement for the future,</p>
  
  <p style="color: white; font-size: 1.2rem; font-weight: bold;">Bosko Kante<br/>Founder and President, HiiiWAV</p>
  
  <div style="text-align: center; margin-top: 40px;">
    <a href="https://hiiiwav.org/donate" style="display: inline-block; background: #A34DFF; color: white; padding: 16px 40px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 1.1rem;">Donate</a>
  </div>
</div>

<div style="background: #1a0533; padding: 60px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #99FF69; font-size: 2rem; text-align: center; margin-bottom: 30px;">AFRO AI: MVP Recap</h2>
  
  <div style="background: rgba(163, 77, 255, 0.2); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
    <h3 style="color: #A34DFF; font-size: 1.3rem; margin-bottom: 15px;">THANK YOU TO OUR SUPPORTERS</h3>
    <p style="color: white; line-height: 1.7;">Thank you <a href="https://marksfamilyfoundation.org" style="color: #99FF69;">Amy Dornbusch</a> and the <a href="https://marksfamilyfoundation.org" style="color: #99FF69;">Marks Family Foundation</a> for your ongoing support and belief in our mission. Your contributions helped us launch our AFRO AI: MVP program this past spring 2024!</p>
  </div>
  
  <h3 style="color: white; font-size: 1.5rem; margin-bottom: 20px;">Program Overview</h3>
  <p style="color: #ccc; line-height: 1.7; margin-bottom: 20px;">This three-month program took winners of our previous AFRO AI program (2023) and Afrofilterism program (2022) on a journey to build functioning prototypes. Five artist teams participated in:</p>
  
  <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-bottom: 30px;">
    <li>Mindset Development Retreats</li>
    <li>Pitch Deck Workshops</li>
    <li>Customer Discovery Sprints</li>
    <li>MVP Development Bootcamp</li>
  </ul>
  
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px;">
    <div style="text-align: center; background: rgba(0,0,0,0.3); padding: 30px; border-radius: 8px;">
      <div style="font-size: 3rem; font-weight: bold; color: #99FF69;">220</div>
      <div style="color: #ccc;">Artists Impacted</div>
    </div>
    <div style="text-align: center; background: rgba(0,0,0,0.3); padding: 30px; border-radius: 8px;">
      <div style="font-size: 3rem; font-weight: bold; color: #99FF69;">51</div>
      <div style="color: #ccc;">Artist-Entrepreneurs Supported</div>
    </div>
    <div style="text-align: center; background: rgba(0,0,0,0.3); padding: 30px; border-radius: 8px;">
      <div style="font-size: 3rem; font-weight: bold; color: #99FF69;">50+</div>
      <div style="color: #ccc;">Products by 2027</div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #A34DFF 0%, #6B21A8 100%); padding: 60px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 2rem; text-align: center; margin-bottom: 30px;">🏆 Grand Prize Winner: Choice Scores</h2>
  <h3 style="color: #99FF69; font-size: 1.5rem; text-align: center; margin-bottom: 30px;">$10,000 Prize — Kev Choice</h3>
  
  <p style="color: white; line-height: 1.8; margin-bottom: 20px;">Rapper and virtuoso pianist <strong>Kev Choice</strong> joined AFRO AI in 2023, initially fearful of AI's impact on musicians. Through our discovery process, we identified that his 40-hour task of transforming songs into orchestral scores could be streamlined with AI.</p>
  
  <p style="color: white; line-height: 1.8; margin-bottom: 30px;">Kev founded Choice Scores then added co-founders violinist/MBA <strong>Sam Wilkins</strong> and recording engineer/music tech developer <strong>Jorge Hernandez</strong>. Together, they developed an AI notation tool that helps music educators and unlocks countless songs by Black creators for live performance.</p>
  
  <blockquote style="background: rgba(0,0,0,0.3); padding: 30px; border-left: 4px solid #99FF69; border-radius: 8px; margin: 30px 0;">
    <p style="color: white; font-style: italic; font-size: 1.2rem; margin: 0;">"With Choice Scores, what used to take me 30-40 hours can happen almost instantly. It's a game-changer for composers everywhere."</p>
    <footer style="color: #99FF69; margin-top: 15px;">— Kev Choice</footer>
  </blockquote>
</div>

<div style="background: #1a1a1a; padding: 60px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 2rem; text-align: center; margin-bottom: 40px;">More MVP Winners</h2>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px;">
    <div style="background: rgba(163, 77, 255, 0.1); padding: 30px; border-radius: 8px; border: 1px solid #A34DFF;">
      <h3 style="color: #99FF69; margin-bottom: 15px;">1763 Co. — Meaghan Maples</h3>
      <p style="color: #ccc; line-height: 1.7;">AI event creator assistant named <strong>Andy</strong> that revolutionizes event creation with curated access to chefs, musicians, and intimate venues.</p>
    </div>
    
    <div style="background: rgba(163, 77, 255, 0.1); padding: 30px; border-radius: 8px; border: 1px solid #A34DFF;">
      <h3 style="color: #99FF69; margin-bottom: 15px;">Worth.AI — RyanNicole Austin</h3>
      <p style="color: #ccc; line-height: 1.7;">An AI-powered rate calculator for performing artists that addresses pay disparities by helping artists understand and assert their true worth.</p>
      <blockquote style="color: white; font-style: italic; margin-top: 15px; padding-left: 15px; border-left: 2px solid #99FF69;">"You have to know your worth to get your worth."</blockquote>
    </div>
    
    <div style="background: rgba(163, 77, 255, 0.1); padding: 30px; border-radius: 8px; border: 1px solid #A34DFF;">
      <h3 style="color: #99FF69; margin-bottom: 15px;">GooRoo — Jariatu Mansaray</h3>
      <p style="color: #ccc; line-height: 1.7;">An AI-powered, voice-enabled co-pilot for music creators that streamlines the production workflow from beat selection to exporting tracks.</p>
    </div>
    
    <div style="background: rgba(163, 77, 255, 0.1); padding: 30px; border-radius: 8px; border: 1px solid #A34DFF;">
      <h3 style="color: #99FF69; margin-bottom: 15px;">Ready Player Two — Nocturnal Summer</h3>
      <p style="color: #ccc; line-height: 1.7;">A music collaboration application that models the multiplayer experience of video games through immersive, turn-based, gamified music collaboration.</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #0a3d0a 0%, #1a1a1a 100%); padding: 60px 40px; border-radius: 12px; margin-bottom: 40px; border: 2px solid #99FF69;">
  <h2 style="color: #99FF69; font-size: 2rem; text-align: center; margin-bottom: 20px;">🎉 HiiiWAV Selected as Finalist</h2>
  <h3 style="color: white; font-size: 1.3rem; text-align: center; margin-bottom: 30px;">Doris Duke Foundation — 2024 Performing Arts Technologies Lab</h3>
  
  <p style="color: #ccc; line-height: 1.8; margin-bottom: 20px; text-align: center;">Out of <strong style="color: #99FF69;">745 applicants</strong> from 43 states, HiiiWAV is honored to be among just <strong style="color: #99FF69;">40 finalists</strong>.</p>
  
  <h4 style="color: white; margin-top: 30px; margin-bottom: 15px;">HiiiWAV's AFRO AI LIVE initiative will focus on:</h4>
  <ul style="color: #ccc; line-height: 2; margin-left: 20px;">
    <li><strong style="color: #99FF69;">Choice Scores:</strong> Empowering jazz musicians to adapt to new pieces in real-time</li>
    <li><strong style="color: #99FF69;">ElectroSpit Transformation Suite:</strong> AI-driven audio transformations during live performances</li>
    <li><strong style="color: #99FF69;">Co-Founders 3D Musical Theater:</strong> AI-powered immersive 3D projection for scenic design</li>
  </ul>
</div>

<div style="background: linear-gradient(135deg, #A34DFF 0%, #E97451 100%); padding: 60px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: white; font-size: 2.5rem; margin-bottom: 20px;">AFRO AI 2025</h2>
  <p style="color: white; font-size: 1.5rem; margin-bottom: 30px;">Up to <strong>$120,000</strong> in funding available</p>
  <a href="https://hiiiwav.org/afro-ai" style="display: inline-block; background: #99FF69; color: black; padding: 20px 50px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 1.3rem;">APPLY NOW</a>
</div>
`,
  },
  {
    slug: 'the-winners-of-afro-ai-mvp',
    title: 'The Winners of AFRO AI MVP is...',
    subtitle: 'Announcing our top projects',
    excerpt: 'Celebrating the standout projects and Grand Prize winner from our AFRO AI MVP program - Choice Scores by Kev Choice takes the $10,000 prize.',
    issueNumber: 10,
    publishedAt: new Date('2024-10-15'),
    content: `
<div style="background: linear-gradient(135deg, #A34DFF 0%, #6B21A8 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🏆 The Winners of AFRO AI MVP</h1>
  <p style="color: #99FF69; font-size: 1.5rem;">Celebrating Innovation in Artist-Owned Technology</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.2rem; line-height: 1.8; margin-top: 20px;">We're thrilled to announce the winners of our AFRO AI MVP program! After months of hard work, learning, and building, our cohort members presented their incredible projects at Demo Day.</p>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 60px 40px; border-radius: 12px; margin-bottom: 40px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 10px;">🥇 Grand Prize Winner</h2>
  <h3 style="color: #1a0533; font-size: 2.5rem; margin-bottom: 20px;">Choice Scores by Kev Choice</h3>
  <div style="background: black; color: #99FF69; display: inline-block; padding: 15px 40px; border-radius: 50px; font-size: 1.5rem; font-weight: bold;">$10,000 Prize</div>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px;">Rapper and virtuoso pianist <strong style="color: white;">Kev Choice</strong> developed an AI notation tool that helps music educators and unlocks countless songs by Black creators for live performance.</p>
  
  <blockquote style="background: rgba(163, 77, 255, 0.2); padding: 30px; border-left: 4px solid #A34DFF; border-radius: 8px;">
    <p style="color: white; font-style: italic; font-size: 1.2rem;">"With Choice Scores, what used to take me 30-40 hours can happen almost instantly. It's a game-changer for composers everywhere."</p>
    <footer style="color: #99FF69; margin-top: 10px;">— Kev Choice</footer>
  </blockquote>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">All MVP Projects</h2>
  
  <div style="display: grid; gap: 20px;">
    <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 8px;">
      <h3 style="color: #99FF69;">🥈 1763 Co. — Meaghan Maples</h3>
      <p style="color: white;">AI event creator assistant Andy for seamless event production</p>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 8px;">
      <h3 style="color: #99FF69;">🥉 Worth.AI — RyanNicole Austin</h3>
      <p style="color: white;">AI-powered rate calculator addressing artist pay disparities</p>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 8px;">
      <h3 style="color: #99FF69;">GooRoo — Jariatu Mansaray</h3>
      <p style="color: white;">Voice-enabled AI co-pilot for music production</p>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 8px;">
      <h3 style="color: #99FF69;">Ready Player Two — Nocturnal Summer</h3>
      <p style="color: white;">Gamified music collaboration platform</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #A34DFF 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: white; font-size: 2rem; margin-bottom: 20px;">Congratulations to All Participants! 🎉</h2>
  <p style="color: white; font-size: 1.1rem; margin-bottom: 30px;">Let's keep building together!</p>
  <a href="https://hiiiwav.org/donate" style="display: inline-block; background: black; color: #99FF69; padding: 16px 40px; border-radius: 50px; font-weight: bold; text-decoration: none;">Support HiiiWAV</a>
</div>
`,
  },
  {
    slug: 'hiiiwav-fest-24-recap',
    title: "HiiiWAV FEST '24 Recap",
    subtitle: 'June 8th was a vibe like no other',
    excerpt: "It feels like we've packed a full year of activity into just the first half of 2024! HiiiWAV FEST was a celebration of music, technology, and community.",
    issueNumber: 9,
    publishedAt: new Date('2024-06-20'),
    coverImage: '/media/images/HiiiWAV-Fest.png',
    content: `
<div style="background: linear-gradient(135deg, #A34DFF 0%, #E97451 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🎉 HiiiWAV FEST '24 Recap</h1>
  <p style="color: white; font-size: 1.5rem;">June 8th was a vibe like no other</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.2rem; line-height: 1.8; margin-top: 20px;">It feels like we've packed a full year of activity into just the first half of 2024! HiiiWAV FEST June 8th was a vibe like no other. We launched and graduated our first AFRO AI MVP cohort, and we continue to grow our community every day.</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #99FF69; font-size: 2rem; text-align: center; margin-bottom: 30px;">What a Day!</h2>
  
  <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px;">Our inaugural music and technology festival brought together the best of Oakland's creative community. The energy was electric, the performances were incredible, and the connections made were priceless.</p>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 10px;">🎤</div>
      <h3 style="color: white; margin-bottom: 10px;">Live Performances</h3>
      <p style="color: #ccc;">Joint Venture artists on stage</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 10px;">🥽</div>
      <h3 style="color: white; margin-bottom: 10px;">Tech Demos</h3>
      <p style="color: #ccc;">AR/VR experiences & ElectroSpit ESX-1</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 10px;">🌍</div>
      <h3 style="color: white; margin-bottom: 10px;">Community</h3>
      <p style="color: #ccc;">Oakland's creative tech scene united</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 10px;">🚀</div>
      <h3 style="color: white; margin-bottom: 10px;">Afrofuturism</h3>
      <p style="color: #ccc;">Art meets technology</p>
    </div>
  </div>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">Featured Artists</h2>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">Kev Choice</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">RyanNicole</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">Grand Nationxl</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">GOOROO</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">Oaktown Soul</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">McArthur Maze</span>
    <span style="background: rgba(0,0,0,0.3); color: white; padding: 10px 25px; border-radius: 50px;">Mama Haze</span>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 50px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 20px;">📸 Relive the Magic</h2>
  <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
    <a href="https://hiiiwav.org/fest-gallery" style="display: inline-block; background: black; color: #99FF69; padding: 16px 30px; border-radius: 50px; font-weight: bold; text-decoration: none;">View Gallery</a>
    <a href="https://youtube.com/@hiiiwav" style="display: inline-block; background: black; color: #99FF69; padding: 16px 30px; border-radius: 50px; font-weight: bold; text-decoration: none;">Watch Video Recap</a>
  </div>
</div>

<div style="background: #1a0533; padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: white; font-size: 2rem; margin-bottom: 20px;">Support the Movement</h2>
  <p style="color: #ccc; margin-bottom: 30px;">Your donation helps us continue to provide free programs and host community events.</p>
  <a href="https://hiiiwav.org/donate" style="display: inline-block; background: #99FF69; color: black; padding: 16px 40px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 1.1rem;">Donate Now</a>
</div>
`,
  },
  {
    slug: 'march-magic-afro-ai-mvp-hiiiwav-fest',
    title: 'March Magic: AFRO AI MVP & HiiiWAV Fest',
    subtitle: 'Big announcements for spring 2024',
    excerpt: 'Exciting updates on the AFRO AI MVP program kicking off and HiiiWAV FEST preparations for June 8th.',
    issueNumber: 8,
    publishedAt: new Date('2024-03-15'),
    content: `
<div style="background: linear-gradient(135deg, #1a0533 0%, #A34DFF 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px;">✨ March Magic</h1>
  <p style="color: #99FF69; font-size: 1.5rem;">AFRO AI MVP & HiiiWAV Fest Updates</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.2rem; line-height: 1.8; margin-top: 20px;">Spring is here and we're buzzing with exciting updates!</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 2rem; margin-bottom: 30px;">AFRO AI MVP Kicks Off</h2>
  
  <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">Our AFRO AI MVP cohort has officially begun! Five incredible artist teams are embarking on a three-month journey:</p>
  
  <div style="display: grid; gap: 15px; margin-bottom: 30px;">
    <div style="background: rgba(163, 77, 255, 0.2); padding: 20px; border-radius: 8px; border-left: 4px solid #99FF69;">
      <strong style="color: #99FF69;">Kev Choice</strong> <span style="color: #ccc;">— Choice Scores</span>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 20px; border-radius: 8px; border-left: 4px solid #99FF69;">
      <strong style="color: #99FF69;">RyanNicole Austin</strong> <span style="color: #ccc;">— Worth.AI</span>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 20px; border-radius: 8px; border-left: 4px solid #99FF69;">
      <strong style="color: #99FF69;">Meaghan Maples</strong> <span style="color: #ccc;">— 1763 Co.</span>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 20px; border-radius: 8px; border-left: 4px solid #99FF69;">
      <strong style="color: #99FF69;">Jariatu Mansaray</strong> <span style="color: #ccc;">— GooRoo</span>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 20px; border-radius: 8px; border-left: 4px solid #99FF69;">
      <strong style="color: #99FF69;">Nocturnal Summer</strong> <span style="color: #ccc;">— Ready Player Two</span>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 60px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h2 style="color: black; font-size: 2.5rem; margin-bottom: 20px;">🎪 HiiiWAV FEST 2024</h2>
  <p style="color: #1a0533; font-size: 1.5rem; margin-bottom: 30px;">June 8th • Oakland • HiiiWAV HQ</p>
  <a href="https://hiiiwav.org/fest" style="display: inline-block; background: black; color: #99FF69; padding: 20px 50px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 1.2rem;">Get Tickets →</a>
</div>

<div style="background: #1a0533; padding: 50px 40px; border-radius: 12px; text-align: center;">
  <p style="color: #ccc; margin-bottom: 20px;">Follow us for behind-the-scenes content</p>
  <a href="https://instagram.com/hiiiwav" style="color: #99FF69; font-size: 1.2rem; text-decoration: none;">@hiiiwav</a>
</div>
`,
  },
  {
    slug: 'a-heartfelt-thanks-to-everyone',
    title: 'A Heartfelt Thanks to Everyone!',
    subtitle: 'Gratitude for our amazing community',
    excerpt: 'Reflecting on our incredible community and the support that makes HiiiWAV possible as we head into an exciting 2024.',
    issueNumber: 7,
    publishedAt: new Date('2024-02-10'),
    content: `
<div style="background: linear-gradient(135deg, #E97451 0%, #A34DFF 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">❤️ A Heartfelt Thanks</h1>
  <p style="color: white; font-size: 1.3rem;">To Everyone Who Makes HiiiWAV Possible</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">As we continue to grow and create together, we want to take a moment to express our deepest gratitude to everyone who has been part of this journey.</p>
  <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">To our artists, creators, funders, volunteers, and supporters – <strong style="color: #99FF69;">you are the heartbeat of HiiiWAV</strong>.</p>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; text-align: center; margin-bottom: 30px;">What's Coming Up</h2>
  <ul style="color: white; font-size: 1.1rem; line-height: 2.5; list-style: none; padding: 0;">
    <li>🚀 <strong>AFRO AI MVP Program</strong> — Launching soon</li>
    <li>🎪 <strong>HiiiWAV FEST 2024</strong> — June 8th</li>
    <li>🤝 <strong>New Joint Ventures</strong> — Expanding our network</li>
    <li>📚 <strong>Community Workshops</strong> — Free tech education</li>
  </ul>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 20px;">Together, we're building something special.</h2>
  <p style="color: #1a0533; font-size: 1.1rem; margin-bottom: 30px;">Thank you for being part of it.</p>
  <p style="color: black; font-weight: bold;">With gratitude,<br/>The HiiiWAV Team 🙏🏽</p>
</div>
`,
  },
  {
    slug: 'hiiiwavs-2024-blast-off',
    title: "HiiiWAV's 2024 Blast Off",
    subtitle: 'Get ready for an incredible year ahead',
    excerpt: 'Kicking off 2024 with HiiiWAV FEST announcements, new team members, and a spotlight on Kataly Foundation.',
    issueNumber: 6,
    publishedAt: new Date('2024-01-15'),
    content: `
<div style="background: linear-gradient(135deg, #1a0533 0%, #A34DFF 50%, #E97451 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🚀 HiiiWAV's 2024 Blast Off</h1>
  <p style="color: #99FF69; font-size: 1.3rem;">Get Ready for an Incredible Year</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.2rem; line-height: 1.8; margin-top: 20px;">Happy New Year! We're kicking off 2024 with incredible momentum and exciting announcements.</p>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 60px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h2 style="color: black; font-size: 2.5rem; margin-bottom: 10px;">🎪 HiiiWAV FEST</h2>
  <p style="color: #1a0533; font-size: 2rem; font-weight: bold; margin-bottom: 20px;">June 8th, 2024</p>
  <p style="color: #1a0533; font-size: 1.1rem; margin-bottom: 30px;">2781 Telegraph Ave, Oakland</p>
  <p style="color: #1a0533; line-height: 1.8;">Experience live performances, immersive AR/VR, and Oakland-made tech including ElectroSpit's ESX-1 — the world's first wearable instrument!</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 1.8rem; margin-bottom: 20px;">👋 Welcome Noel Muluneh!</h2>
  <p style="color: #ccc; line-height: 1.8;">We're thrilled to welcome <strong style="color: white;">Noel Muluneh</strong> as our new Program Coordinator/Communications Coordinator. With her passion for empowering artists, Noel is the perfect addition to our team! 📚🎨👏</p>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; margin-bottom: 20px;">🌟 Funder Spotlight: Kataly Foundation</h2>
  <p style="color: white; line-height: 1.8; margin-bottom: 20px;">Special thanks to <strong>Lynne Hoeys</strong>, Chief Investment Officer at <strong>Kataly Foundation</strong>, for their unwavering support of HiiiWAV.</p>
  <p style="color: rgba(255,255,255,0.8); line-height: 1.8;">Their mission to empower Black and brown communities echoes our commitment to supporting artists.</p>
</div>

<div style="background: #1a0533; padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: white; font-size: 2rem; margin-bottom: 30px;">Let's make 2024 extraordinary!</h2>
  <a href="https://hiiiwav.org/donate" style="display: inline-block; background: #99FF69; color: black; padding: 16px 40px; border-radius: 50px; font-weight: bold; text-decoration: none;">Support HiiiWAV</a>
</div>
`,
  },
  {
    slug: 'afro-ai-champs-epic-recap',
    title: 'AFRO AI Champs + Epic Recap!',
    subtitle: 'Celebrating our 2023 AFRO AI graduates',
    excerpt: 'Meet the champions of our AFRO AI program and the incredible projects they built.',
    issueNumber: 5,
    publishedAt: new Date('2023-12-01'),
    content: `
<div style="background: linear-gradient(135deg, #A34DFF 0%, #6B21A8 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🏆 AFRO AI Champs</h1>
  <p style="color: #99FF69; font-size: 1.3rem;">Celebrating Our 2023 Graduates</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.2rem; line-height: 1.8; margin-top: 20px;">We are thrilled to celebrate the incredible achievements of our AFRO AI 2023 cohort! These amazing individuals took the leap to learn AI and build products that serve their communities.</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #99FF69; font-size: 2rem; text-align: center; margin-bottom: 30px;">Standout Projects</h2>
  
  <div style="display: grid; gap: 20px;">
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px;">
      <h3 style="color: #A34DFF;">Kev Choice</h3>
      <p style="color: #ccc;">AI-powered notation tool concept for transforming songs into orchestral scores</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px;">
      <h3 style="color: #A34DFF;">RyanNicole Austin</h3>
      <p style="color: #ccc;">Artist compensation calculator to fight pay disparities</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px;">
      <h3 style="color: #A34DFF;">Jariatu Mansaray</h3>
      <p style="color: #ccc;">Voice-enabled music production assistant</p>
    </div>
    <div style="background: rgba(163, 77, 255, 0.2); padding: 25px; border-radius: 8px;">
      <h3 style="color: #A34DFF;">Meaghan Maples</h3>
      <p style="color: #ccc;">AI event planning assistant</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 20px;">🎉 Congratulations to All!</h2>
  <p style="color: #1a0533; margin-bottom: 20px;">Based on this success, we're planning <strong>AFRO AI MVP</strong> for top graduates!</p>
</div>
`,
  },
  {
    slug: 'get-ready-for-afro-ai-demo-day-23',
    title: "Get Ready for AFRO AI Demo Day '23",
    subtitle: 'Join us for our first Demo Day!',
    excerpt: 'Inviting the community to witness what our AFRO AI cohort has built.',
    issueNumber: 4,
    publishedAt: new Date('2023-11-15'),
    content: `
<div style="background: linear-gradient(135deg, #E97451 0%, #A34DFF 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px;">🎤 Get Ready for Demo Day!</h1>
  <p style="color: white; font-size: 1.3rem;">AFRO AI 2023</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #99FF69; font-size: 1.8rem; margin-bottom: 30px;">What is Demo Day?</h2>
  <p style="color: #ccc; line-height: 1.8; margin-bottom: 20px;">Demo Day is when our program participants present their AI-powered projects to the community. It's a celebration of:</p>
  <ul style="color: #ccc; line-height: 2.5; list-style: none; padding: 0;">
    <li>📚 <strong style="color: white;">Learning</strong> — Weeks of dedicated study</li>
    <li>🔨 <strong style="color: white;">Building</strong> — Real, working products</li>
    <li>🤝 <strong style="color: white;">Community</strong> — Coming together to support each other</li>
  </ul>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px; text-align: center;">
  <h2 style="color: white; font-size: 1.8rem; margin-bottom: 20px;">📍 Event Details</h2>
  <p style="color: white; font-size: 1.2rem; line-height: 2;">
    <strong>Location:</strong> HiiiWAV HQ<br/>
    2781 Telegraph Ave, Oakland<br/><br/>
    <strong>RSVP Required</strong> — Space is limited!
  </p>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 20px;">Your presence matters! 🚀</h2>
  <p style="color: #1a0533;">See you at Demo Day!</p>
</div>
`,
  },
  {
    slug: 'hiiiwav-2023-hiiilights',
    title: 'HiiiWAV 2023 HiiiLIGHTS',
    subtitle: 'Welcome to the first edition of HiiiLIGHTS!',
    excerpt: 'The inaugural edition of HiiiLIGHTS – our take on AI, emerging tech, and empowering artists as builders.',
    issueNumber: 3,
    publishedAt: new Date('2023-09-15'),
    coverImage: '/logo-white.png',
    content: `
<div style="background: linear-gradient(135deg, #1a0533 0%, #A34DFF 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">Welcome to HiiiLIGHTS!</h1>
  <p style="color: #99FF69; font-size: 1.3rem;">The First Edition • September 2023</p>
</div>

<div style="background: #E97451; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: white; font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">Recently, news feeds have been dominated by concerns over AI. However, at HiiiWAV, we firmly believe our community should be at the <strong>forefront</strong> of these technological advancements, shaping the future rather than being shaped by it.</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 2rem; margin-bottom: 20px;">Our Perspective on AI</h2>
  <p style="color: #ccc; line-height: 1.8; margin-bottom: 20px;">Emerging AI tools are game-changers that can simplify our work and pave the way for unprecedented forms of art and music.</p>
  <p style="color: #ccc; line-height: 1.8;">Fifty years ago, the birth of hip-hop was an innovative twist on using existing technology creatively. Today, we stand at a similar crossroads with AI.</p>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; margin-bottom: 30px;">Featured Artists</h2>
  <div style="display: grid; gap: 20px;">
    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px;">
      <h3 style="color: #99FF69;">Sistah Scifi</h3>
      <p style="color: white;">Visionary creator blending science fiction with Afrofuturist perspectives</p>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px;">
      <h3 style="color: #99FF69;">DJ Mani Draper</h3>
      <p style="color: white;">Pushing the boundaries of sound and technology in the Bay Area</p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <p style="color: black; font-size: 1.2rem; font-weight: bold;">Keep rising,</p>
  <p style="color: #1a0533; font-size: 1.5rem; margin-top: 10px;">– Bosko 🙏🏽</p>
</div>
`,
  },
  {
    slug: 'hiiiwav-studio-secured',
    title: 'HiiiWAV Studio Secured!',
    subtitle: 'A new home for creativity',
    excerpt: 'We have secured our permanent studio space at 2781 Telegraph Ave in Oakland!',
    issueNumber: 2,
    publishedAt: new Date('2023-08-01'),
    content: `
<div style="background: linear-gradient(135deg, #99FF69 0%, #A34DFF 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🏠 HiiiWAV Studio Secured!</h1>
  <p style="color: white; font-size: 1.3rem;">A New Home for Creativity</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <p style="color: white; font-size: 1.2rem; line-height: 1.8;">Dear HiiiWAV Family,</p>
  <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">We have incredible news – <strong style="color: #99FF69;">HiiiWAV has secured our permanent home!</strong></p>
</div>

<div style="background: #A34DFF; padding: 60px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.5rem; margin-bottom: 20px;">Our New HQ</h2>
  <p style="color: #99FF69; font-size: 2rem; font-weight: bold;">2781 Telegraph Ave</p>
  <p style="color: white; font-size: 1.3rem;">Oakland, CA</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #99FF69; font-size: 1.8rem; margin-bottom: 30px;">What This Means</h2>
  <ul style="color: #ccc; line-height: 2.5; list-style: none; padding: 0;">
    <li>📚 <strong style="color: white;">A Home for Programs</strong> — Code Vibes, AFRO AI, and more</li>
    <li>🎤 <strong style="color: white;">Community Space</strong> — Events, Demo Days, workshops</li>
    <li>🎵 <strong style="color: white;">Recording & Production</strong> — Facilities for our artists</li>
    <li>💡 <strong style="color: white;">Tech Hub</strong> — Innovation at music × technology</li>
  </ul>
</div>

<div style="background: linear-gradient(135deg, #E97451 0%, #A34DFF 100%); padding: 50px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: white; font-size: 2rem; margin-bottom: 20px;">This is just the beginning! 🚀</h2>
  <p style="color: white;">With gratitude,<br/>The HiiiWAV Team</p>
</div>
`,
  },
  {
    slug: 'apply-to-afro-ai',
    title: 'Apply to AFRO AI',
    subtitle: 'Your journey into AI starts here',
    excerpt: 'Applications are now open for our flagship AFRO AI program. No coding experience required.',
    issueNumber: 1,
    publishedAt: new Date('2023-06-15'),
    content: `
<div style="background: linear-gradient(135deg, #A34DFF 0%, #1a0533 100%); padding: 80px 40px; border-radius: 12px; text-align: center; margin-bottom: 40px;">
  <h1 style="color: white; font-size: 3rem; margin-bottom: 20px;">🤖 Apply to AFRO AI</h1>
  <p style="color: #99FF69; font-size: 1.3rem;">Applications Now Open!</p>
</div>

<div style="background: #99FF69; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 20px;">What is AFRO AI?</h2>
  <p style="color: #1a0533; font-size: 1.2rem; line-height: 1.8;">HiiiWAV's flagship program teaching creators to build AI-powered tools and products — <strong>no coding experience required</strong>.</p>
</div>

<div style="background: #1a1a1a; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: #A34DFF; font-size: 1.8rem; margin-bottom: 30px;">Who Should Apply?</h2>
  <ul style="color: #ccc; line-height: 2.5; list-style: none; padding: 0;">
    <li>🎨 <strong style="color: white;">Artists</strong> — Enhance your creative practice</li>
    <li>✊ <strong style="color: white;">Activists</strong> — Amplify your impact</li>
    <li>💼 <strong style="color: white;">Entrepreneurs</strong> — Build your ideas</li>
    <li>🌟 <strong style="color: white;">Anyone curious</strong> — About AI and creativity</li>
  </ul>
</div>

<div style="background: #A34DFF; padding: 50px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h2 style="color: white; font-size: 1.8rem; margin-bottom: 30px;">Program Details</h2>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; text-align: center;">
      <div style="color: #99FF69; font-size: 2rem; font-weight: bold;">8</div>
      <div style="color: white;">Weeks</div>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; text-align: center;">
      <div style="color: #99FF69; font-size: 2rem; font-weight: bold;">FREE</div>
      <div style="color: white;">For accepted applicants</div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #99FF69 0%, #7ACC54 100%); padding: 60px 40px; border-radius: 12px; text-align: center;">
  <h2 style="color: black; font-size: 2rem; margin-bottom: 30px;">Don't miss this opportunity! 🚀</h2>
  <a href="https://hiiiwav.org/afro-ai" style="display: inline-block; background: black; color: #99FF69; padding: 20px 50px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 1.2rem;">Apply Now</a>
</div>
`,
  },
]

async function main() {
  console.log('🗑️ Clearing existing newsletters...')
  await db.delete(newsletters)
  
  console.log('📰 Seeding newsletters with rich HTML content...')
  
  for (const newsletter of newsletterData) {
    await db.insert(newsletters).values(newsletter)
    console.log(`  ✓ Added: ${newsletter.title}`)
  }
  
  console.log(`\n✅ Successfully seeded ${newsletterData.length} newsletters with styled content!`)
}

main()
  .then(async () => {
    await client.end()
    process.exit(0)
  })
  .catch(async (err) => {
    console.error('Error seeding newsletters:', err)
    await client.end()
    process.exit(1)
  })
