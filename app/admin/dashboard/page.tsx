export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Director Tools</h2>
        <div className="space-y-2">
          <a href="/admin/deck" className="block text-primary hover:underline font-medium">
            Edit Pitch Deck
          </a>
          <a href="/deck" className="block text-primary hover:underline">
            Preview Pitch Deck (PDF)
          </a>
          <a href="/" className="block text-primary hover:underline">
            View Website
          </a>
        </div>
      </div>
    </div>
  )
}

