# 🚀 Quick Start Guide

## Step 1: Install Dependencies (done)
```bash
npm install  # Already done ✅
```

## Step 2: Set Up Database (2 minutes)

### Create Neon Database
1. Go to https://neon.tech
2. Sign up/login
3. Click "Create Project"
4. Name: "hiiiwav"
5. Copy connection string

### Create `.env.local`
```bash
# Create file
cat > .env.local << 'EOF'
DATABASE_URL="your-connection-string-here"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
EOF
```

### Generate Auth Secret
```bash
openssl rand -base64 32
```

Copy the output and replace `your-secret-here` in `.env.local`.

### Push Schema to Database
```bash
npm run db:push
```

## Step 3: Import WordPress Content (1 minute)

```bash
npm run wp:import
```

This fetches all posts and pages from hiiiwav.org and imports them into your database.

## Step 4: Create Admin User (30 seconds)

### Generate Password Hash
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

### Open Database Studio
```bash
npm run db:studio
```

### Insert User
1. Go to http://localhost:4983
2. Click "users" table
3. Click "Add Row"
4. Fill in:
   - email: `admin@hiiiwav.org`
   - name: `Admin`
   - role: `admin`
   - password_hash: (paste the hash from step 1)
5. Click "Create"

## Step 5: Start Dev Server

```bash
npm run dev
```

Visit http://localhost:3000

## Step 6: Test Everything

- **Homepage**: http://localhost:3000 ✅
- **Blog**: http://localhost:3000/blog ✅
- **Login**: http://localhost:3000/login ✅
- **Admin**: http://localhost:3000/admin ✅

---

## Optional: Enable AI Chat Widget

1. Get OpenAI API key from https://platform.openai.com
2. Add to `.env.local`:
```bash
OPENAI_API_KEY="sk-proj-..."
```
3. Uncomment in `app/layout.tsx`:
```tsx
import { ChatWidget } from "@/components/ai/chat-widget";
// ...
<ChatWidget />
```
4. Restart dev server

---

## Optional: Deploy to Vercel (5 minutes)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial migration"
git push origin main

# 2. Import to Vercel
# Go to https://vercel.com
# Click "Import Project"
# Select your repo
# Add environment variables (from .env.local)
# Click "Deploy"
```

---

## That's It! 🎉

You now have a modern Next.js app with:
- ✅ All your WordPress content
- ✅ Admin dashboard
- ✅ Authentication
- ✅ AI-ready architecture
- ✅ Type-safe database
- ✅ SEO optimization
- ✅ Fast performance

**Next**: Customize the homepage and start building features!

See `docs/MIGRATION_COMPLETE.md` for detailed documentation.




