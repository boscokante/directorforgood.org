import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import { db } from '../db'
import { entities } from '../db/schema'

async function seedEntities() {
  console.log('Seeding initial entities...')

  const initialEntities = [
    {
      slug: 'hiiiwav',
      name: 'HiiiWAV',
      type: 'organization',
      shortBio: 'Oakland-based nonprofit empowering communities through music, technology, and culture.',
      active: true,
    },
    {
      slug: 'electrospit',
      name: 'ElectroSpit',
      type: 'participant',
      shortBio: 'Hip-hop duo combining live instrumentation with electronic production.',
      active: true,
    },
  ]

  for (const entity of initialEntities) {
    try {
      const [created] = await db.insert(entities).values(entity).returning()
      console.log(`✓ Created entity: ${created.name} (ID: ${created.id})`)
    } catch (error: any) {
      if (error.code === '23505') {
        console.log(`- Skipped ${entity.name} (already exists)`)
      } else {
        throw error
      }
    }
  }

  console.log('\nDone!')
  process.exit(0)
}

seedEntities().catch((err) => {
  console.error('Error seeding entities:', err)
  process.exit(1)
})

