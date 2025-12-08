// Run with: node --env-file=.env.local --import tsx scripts/fix-all-images.ts
import { db } from '../db'
import { posts } from '../db/schema'
import { desc, eq } from 'drizzle-orm'

async function main() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

  console.log(`\n=== Fixing images in ${allPosts.length} posts ===\n`)

  let fixedCount = 0

  for (const post of allPosts) {
    let content = post.content || ''
    const originalContent = content
    
    // Fix malformed image links: [text](image-url) -> ![text](image-url)
    // Match links that point to image files but aren't images
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i
    
    // Pattern: [anything](url-ending-in-image-extension) that is NOT preceded by !
    // We need to be careful not to break existing proper images
    
    // First, let's find all link patterns that point to images
    const linkToImagePattern = /(?<!!)\[([^\]]*)\]\((https?:\/\/[^)]+\.(jpg|jpeg|png|gif|webp))\)/gi
    
    let match
    const replacements: Array<{ original: string; replacement: string }> = []
    
    while ((match = linkToImagePattern.exec(content)) !== null) {
      const fullMatch = match[0]
      const altText = match[1] || ''
      const imageUrl = match[2]
      
      // Create proper image syntax
      const replacement = `![${altText}](${imageUrl})`
      replacements.push({ original: fullMatch, replacement })
    }
    
    // Apply replacements
    for (const { original, replacement } of replacements) {
      content = content.replace(original, replacement)
    }
    
    // Clean up empty link remnants like [](url)
    content = content.replace(/\[\s*\]\([^)]+\)/g, '')
    
    // Clean up multiple consecutive newlines
    content = content.replace(/\n{3,}/g, '\n\n')
    
    if (content !== originalContent) {
      await db
        .update(posts)
        .set({ content })
        .where(eq(posts.id, post.id))
      
      console.log(`✅ Fixed ${post.slug}: ${replacements.length} image(s) converted`)
      fixedCount++
    } else {
      console.log(`- ${post.slug}: No changes needed`)
    }
  }

  console.log(`\n=== Done! Fixed ${fixedCount} posts ===`)
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err)
  process.exit(1)
})
