<div align="center">
    <h1 align="center">Snapvibe</h1>
    <h5>Snapvibe is a visually stunning platform for sharing moments 📸, connecting with friends 🤝, and exploring the world 🌍 through photos and videos! 🎥✨</h5>
</div>

<div align="center">
  <a href="https://snapvibeweb.vercel.app">snapvibeweb.vercel.app</a>
</div>
<br/>

![Thumbnail](/public/thumbnail.png)

Key Features:

- 📚 Powerful Sidebar Layout
- 🔒 Route Protection with Next.js
- 🌗 Light and Dark Mode
- 🔑 Authentication using NextAuth(v5)
- 🛍️ User Picture Upload with Caption
- 💼 Server-Side Actions (No API)
- ✏️ Edit and Delete Post Functionality
- 👍 Like and Unlike Functionality
- 💬 Comment Functionality (with Delete Comment Feature)
- 🔖 Bookmark Functionality
- 🚀 Share Post Functionality
- 🔄 Optimistic Updates (Real-Time)
- 💀 Skeleton Loading with Suspense
- ♾️ Infinite Scrolling Feature
- 👤 User Profile Management
- 📥 Saved Posts
- 🖊️ Edit User Profile Page
- 🌐 Dynamic Metadata
- 🔡 Integration of Local Fonts
- 🚀 Deployment using Vercel
- 🌟 Clean, Modern UI using Shadcn-ui
- 📝 Form Design with React Hook Form, Zod, and Sonner
- ⌨️ 100% Written in TypeScript
- 🎁 ...Much More
 
### Prerequisites

**You should have Nodejs and Bun installed on your system**

### Cloning the repository

```shell
git clone https://github.com/abdtriedcoding/snapvibe.git
```

### Install packages

```shell
bun i
```

### Setup .env file taking refrence from .env.example file

### Setup Prisma

Add Database (I used Supabase)

```shell
bunx prisma generate
bunx prisma db push

```

### Start the app

```shell
bun run dev
```
