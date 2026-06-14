# مجله (My Blog)

A Persian (RTL) magazine blog built with Next.js 14, Tailwind CSS, and a REST API backend. Browse articles by category, search, paginate, and create new posts from the sidebar.

## Features

- RTL layout with Vazirmatn font
- Magazine archive with featured post, search, and category filters
- Pagination for large article lists
- Create new blog posts via modal form
- SEO: metadata, Open Graph, JSON-LD, sitemap, and robots.txt

## Prerequisites

- Node.js 18+
- npm

## Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the example environment file and adjust values for your setup:

```bash
cp .env.example .env
```

3. Configure the required variables in `.env`:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (canonical links, sitemap, Open Graph) |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL |
| `NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME` | Hostname for remote blog images (Next.js Image) |

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/              # Next.js App Router pages and layouts
components/
  blog/           # Blog card, featured post, pagination
  magazine/       # Magazine layout, sidebar, new post form
  ui/             # Shared UI (button, modal, breadcrumb, etc.)
hooks/            # Client-side hooks
lib/
  api/            # API client and blog endpoints
  env.ts          # Environment variable helpers
types/            # TypeScript API types
```

## Environment Variables

All configuration lives in `.env`. See `.env.example` for the full list. Never commit `.env` to version control.

## License

Private project.
