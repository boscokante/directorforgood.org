// Run with: node --env-file=.env.local --import tsx scripts/compare-posts.ts
import { resolve } from 'path'

import { db } from '../db'
import { posts } from '../db/schema'
import { desc } from 'drizzle-orm'
import { writeFileSync } from 'fs'

// Change these to match your actual domains
const NEW_SITE_DOMAIN = 'https://hiiiwav-website.vercel.app'
const LOCAL_DOMAIN = 'http://localhost:3001' // Update if your dev server uses a different port
const ORIGINAL_DOMAIN = 'https://hiiiwav.org'

async function main() {
  const allPosts = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      published: posts.published,
      canonical: posts.canonical,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`Found ${allPosts.length} posts`)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Post Comparison - HiiiWAV</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px; 
      max-width: 1600px; 
      margin: 0 auto;
      background: #f5f5f5;
    }
    h1 { margin-bottom: 10px; }
    .stats { color: #666; margin-bottom: 20px; }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th, td { 
      padding: 12px 15px; 
      text-align: left; 
      border-bottom: 1px solid #eee;
    }
    th { 
      background: #333; 
      color: white;
      position: sticky;
      top: 0;
    }
    tr:hover { background: #f9f9f9; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .date { white-space: nowrap; color: #666; font-size: 14px; }
    .status { 
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
    .published { background: #d4edda; color: #155724; }
    .draft { background: #fff3cd; color: #856404; }
    .title { max-width: 300px; }
    .links { font-size: 14px; }
    .links a { display: block; margin: 2px 0; }
    input[type="search"] {
      padding: 10px 15px;
      width: 100%;
      max-width: 400px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>Blog Post Comparison</h1>
  <div class="stats">
    Total: ${allPosts.length} posts | 
    Published: ${allPosts.filter(p => p.published).length} | 
    Drafts: ${allPosts.filter(p => !p.published).length} |
    Generated: ${new Date().toLocaleString()}
  </div>
  
  <input type="search" id="search" placeholder="Filter posts..." onkeyup="filterTable()">
  
  <table id="posts-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Status</th>
        <th>Title</th>
        <th>Local (Dev)</th>
        <th>New Site (Vercel)</th>
        <th>Original Site</th>
      </tr>
    </thead>
    <tbody>
      ${allPosts.map((post, i) => {
        const localUrl = `${LOCAL_DOMAIN}/blog/${post.slug}`
        const newSiteUrl = `${NEW_SITE_DOMAIN}/blog/${post.slug}`
        const originalUrl = post.canonical || `${ORIGINAL_DOMAIN}/blog/${post.slug}`
        const date = new Date(post.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
        return `
      <tr>
        <td>${i + 1}</td>
        <td class="date">${date}</td>
        <td><span class="status ${post.published ? 'published' : 'draft'}">${post.published ? 'Published' : 'Draft'}</span></td>
        <td class="title">${escapeHtml(post.title)}</td>
        <td class="links"><a href="${localUrl}" target="_blank">${localUrl}</a></td>
        <td class="links"><a href="${newSiteUrl}" target="_blank">${newSiteUrl}</a></td>
        <td class="links"><a href="${originalUrl}" target="_blank">${originalUrl}</a></td>
      </tr>`
      }).join('')}
    </tbody>
  </table>
  
  <script>
    function filterTable() {
      const filter = document.getElementById('search').value.toLowerCase();
      const rows = document.querySelectorAll('#posts-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`

  const outputPath = resolve(process.cwd(), 'post-comparison.html')
  writeFileSync(outputPath, html)
  console.log(`\n✅ Generated: ${outputPath}`)
  console.log('Open this file in your browser to compare posts.')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
