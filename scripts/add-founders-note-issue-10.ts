import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import * as schema from '../db/schema'

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })
const { newsletters } = schema

const foundersNote = `## AI For Liberation

Dear HiiiWAV Family,

The robots are here, and there's no denying the growing dread as AI churns out perfect imitations of chart-topping hits—without a single note played by human hands. How can we, flesh-and-blood musicians, compete in this assembly line dominated by machines? The truth is, we can't. But should we want to?

Major labels have long treated music like factory output, underpaying musicians for higher profits. I know this all too well. I'm in the middle of a [battle over Dua Lipa's "Levitating,"](https://hiiiwav.us5.list-manage.com/track/click?u=40579fd95535f4df3037693d2&id=0cc4683c15&e=d68925b02b) a song likely generating over $20 million. Warner Records offered me just $1,500, forcing me into a [costly legal fight](https://hiiiwav.us5.list-manage.com/track/click?u=40579fd95535f4df3037693d2&id=862b8b15a4&e=d68925b02b) for fair compensation ([breakdown](https://hiiiwav.us5.list-manage.com/track/click?u=40579fd95535f4df3037693d2&id=efb611ed6a&e=d68925b02b)). It's a broken system that's exploited creators from the beginning.

&nbsp;

Here's where AI changes the game for the better. Rather than fear it, we should use AI as a tool to escape the system. AI and the internet have torn down the cost barriers that made music creation, promotion, and distribution inaccessible. Now, we can reclaim our art and its future.

&nbsp;

I'm proud of our AFRO AI program and it's incredible artists like Kev Choice, Ryan Nicole, Jariatu Mansaray, and Meaghan Maples. They're not just using AI to copy—they're using it to liberate themselves. They are building companies, owning their tech, and shaping a future where creators thrive.

&nbsp;

In this edition, we're celebrating the bold strides of our AFRO AI MVP cohort. From the exciting Prototype Preview event at Kapor Center, to HiiiWAV being named a national finalist by the Doris Duke Foundation, we aren't just imagining the future—we're building it.

&nbsp;

Finally, I'm being honored this Saturday, September 21st at the Urban League's Gala for my efforts such as AFRO AI supporting artist-entrepreneurs ([get tickets](https://hiiiwav.us5.list-manage.com/track/click?u=40579fd95535f4df3037693d2&id=276e42c862&e=d68925b02b))!

&nbsp;

Join us in shaping a music industry that empowers creators—your contribution makes a difference.

&nbsp;

With appreciation and excitement for the future,

**Bosko Kante**

**Founder and President, HiiiWAV**`

async function main() {
  console.log('Updating newsletter #10 with founder\'s note...')
  
  const [newsletter] = await db
    .select()
    .from(newsletters)
    .where(eq(newsletters.issueNumber, 10))
  
  if (!newsletter) {
    console.log('❌ Newsletter #10 not found in database')
    await client.end()
    return
  }
  
  console.log(`Found: "${newsletter.title}"`)
  
  await db
    .update(newsletters)
    .set({ 
      foundersNote,
      updatedAt: new Date()
    })
    .where(eq(newsletters.issueNumber, 10))
  
  console.log(`✅ Updated with founder's note`)
  
  await client.end()
}

main().catch(console.error)
