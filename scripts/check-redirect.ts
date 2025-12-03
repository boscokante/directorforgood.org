import { db } from '../db';
import { redirects } from '../db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const r = await db.select().from(redirects).where(eq(redirects.sourceUrl, '/resources')).limit(1);
  console.log('Redirect for /resources:', JSON.stringify(r, null, 2));
  const all = await db.select().from(redirects);
  console.log('Total redirects:', all.length);
  process.exit(0);
}
main();
