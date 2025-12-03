import { db } from '@/db'
import { entities } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const typeLabels: Record<string, string> = {
  organization: 'Organization',
  participant: 'Participant',
  staff: 'Staff',
}

const typeBadgeColors: Record<string, string> = {
  organization: 'bg-purple-100 text-purple-700',
  participant: 'bg-blue-100 text-blue-700',
  staff: 'bg-green-100 text-green-700',
}

export default async function AdminEntitiesPage() {
  const allEntities = await db.select().from(entities).orderBy(desc(entities.createdAt))

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">People & Organizations</h1>
        <Button asChild>
          <Link href="/admin/entities/new">Add New</Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Name</th>
              <th className="text-left p-4 font-medium">Type</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-right p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEntities.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No entities yet. Add HiiiWAV, artists, or staff members!
                </td>
              </tr>
            ) : (
              allEntities.map((entity) => (
                <tr key={entity.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{entity.name}</div>
                      {entity.shortBio && (
                        <div className="text-sm text-muted-foreground truncate max-w-md">
                          {entity.shortBio}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded ${typeBadgeColors[entity.type] || 'bg-gray-100 text-gray-700'}`}>
                      {typeLabels[entity.type] || entity.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      entity.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {entity.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/entities/${entity.id}`}>Edit</Link>
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

