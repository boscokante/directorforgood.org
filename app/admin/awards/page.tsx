import { db } from '@/db'
import { awards, awardRecipients, entities } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const categoryLabels: Record<string, string> = {
  grant: 'Grant',
  award: 'Award',
  fellowship: 'Fellowship',
  recognition: 'Recognition',
  nomination: 'Nomination',
}

const categoryColors: Record<string, string> = {
  grant: 'bg-green-100 text-green-700',
  award: 'bg-yellow-100 text-yellow-700',
  fellowship: 'bg-purple-100 text-purple-700',
  recognition: 'bg-blue-100 text-blue-700',
  nomination: 'bg-gray-100 text-gray-700',
}

const statusLabels: Record<string, string> = {
  won: 'Won',
  nominated: 'Nominated',
  finalist: 'Finalist',
  honorable_mention: 'Honorable Mention',
}

export default async function AdminAwardsPage() {
  const allAwards = await db.select().from(awards).orderBy(desc(awards.year), desc(awards.createdAt))

  // Get recipients for each award
  const awardsWithRecipients = await Promise.all(
    allAwards.map(async (award) => {
      const recipients = await db
        .select({ name: entities.name })
        .from(awardRecipients)
        .innerJoin(entities, eq(awardRecipients.entityId, entities.id))
        .where(eq(awardRecipients.awardId, award.id))
      return {
        ...award,
        recipientNames: recipients.map((r) => r.name),
      }
    })
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Awards & Grants</h1>
        <Button asChild>
          <Link href="/admin/awards/new">Add Award</Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Award</th>
              <th className="text-left p-4 font-medium">Recipient(s)</th>
              <th className="text-left p-4 font-medium">Year</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {awardsWithRecipients.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No awards yet. Start adding them!
                </td>
              </tr>
            ) : (
              awardsWithRecipients.map((award) => (
                <tr key={award.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{award.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {award.awardingEntity}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {award.recipientNames.length > 0
                        ? award.recipientNames.join(', ')
                        : <span className="text-muted-foreground">No recipients</span>}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{award.year || '—'}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {award.category && (
                        <span className={`text-xs px-2 py-1 rounded ${categoryColors[award.category] || 'bg-gray-100 text-gray-700'}`}>
                          {categoryLabels[award.category] || award.category}
                        </span>
                      )}
                      {award.status && award.status !== 'won' && (
                        <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700">
                          {statusLabels[award.status] || award.status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/awards/${award.id}`}>Edit</Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

