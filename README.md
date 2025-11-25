# Scentify - Perfume E-Commerce Platform

A modern, scalable NX monorepo for a perfume e-commerce application with React customer frontend, Angular admin panel, and Node.js/NestJS backends.

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start React web app (port 3000)
npx nx serve scentify-web

# Start Angular admin (port 4200)
npx nx serve scentify-admin

# Start Node.js API
npx nx serve scentify-web-api

# Start NestJS admin API
npx nx serve scentify-admin-api
```

## 📁 Project Structure

```
scentify/
├── apps/
│   ├── scentify-web/              # React customer-facing app
│   ├── scentify-web-api/          # Node.js/Express API
│   ├── scentify-admin/            # Angular admin panel
│   └── scentify-admin-api/        # NestJS admin API
└── libs/
    └── shared/
        ├── types/                 # TypeScript interfaces & types
        ├── utils/                 # Shared utility functions
        └── data-access/           # API contracts & DTOs
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite, Angular 20 + esbuild
- **Backend**: Node.js + Express, NestJS
- **Monorepo**: NX 22
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest (React), Jest (Angular, Node, NestJS)
- **Linting**: ESLint
- **Formatting**: Prettier

## 📚 Shared Libraries

### @scentify/shared-types
Common TypeScript interfaces for products, users, orders, reviews, cart, and wishlist.

### @scentify/shared-utils
Shared utility functions and helpers.

### @scentify/shared-data-access
API contracts and DTOs for frontend-backend communication.

## 🎯 Development Guidelines

See [`.agent/workflows/scentify-architecture-rules.md`](./.agent/workflows/scentify-architecture-rules.md) for:
- Architecture best practices
- Library categorization
- Dependency rules
- UI development guidelines
- Perfume-specific features

## 🔧 Common Commands

```bash
# Build all projects
npx nx run-many -t build

# Test all projects
npx nx run-many -t test

# Lint all projects
npx nx run-many -t lint

# Format code
npx nx format:write

# Visualize project graph
npx nx graph

# Build only affected projects
npx nx affected -t build

# Test only affected projects
npx nx affected -t test
```

## 🎨 UI Development Focus

As a UI developer, focus on:
- Building premium, modern interfaces for `scentify-web` (React)
- Creating admin dashboards for `scentify-admin` (Angular)
- Using `@scentify/shared-types` for type safety
- Implementing perfume-specific features (scent filters, fragrance notes, quiz finder)
- Creating stunning designs with micro-animations and dark mode

## 📖 Documentation

- **Walkthrough**: See artifact `walkthrough.md` for complete setup details
- **Architecture Rules**: `.agent/workflows/scentify-architecture-rules.md`
- **Task Breakdown**: See artifact `task.md`

## 🌸 Perfume Domain Features

- **Scent Families**: Floral, Woody, Oriental, Fresh, Gourmand, Chypre, Fougère
- **Fragrance Notes**: Top, Middle, Base (pyramid structure)
- **Perfume Types**: Parfum, EDP, EDT, EDC, Eau Fraîche
- **User Features**: Wishlist ("Perfume Wardrobe"), Reviews, Cart
- **Admin Features**: Product management, Order tracking, User management

## 📝 Notes

- Use `--legacy-peer-deps` for npm install due to Angular/Vitest version conflicts
- TypeScript project references enabled for fast incremental builds
- NX caching configured for optimal CI/CD performance

---

**Ready to build amazing perfume shopping experiences!** 🌸✨
