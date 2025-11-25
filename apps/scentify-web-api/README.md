# Scentify Web API

Express.js backend API for the Scentify perfume application.

## Features

- ✅ Express.js server with TypeScript
- ✅ MongoDB with Mongoose ODM
- ✅ CORS enabled
- ✅ Environment configuration with dotenv
- ✅ RESTful API endpoints
- ✅ Error handling middleware

## Setup

1. **Install dependencies** (already done at workspace root)

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB connection string if needed.

3. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   brew install mongodb-community
   brew services start mongodb-community
   ```

4. **Run the server**
   ```bash
   # From workspace root
   npx nx serve scentify-web-api
   
   # Or with watch mode
   npx nx serve scentify-web-api --watch
   ```

## API Endpoints

### Health Check
- `GET /health` - Check API and database status

### Perfumes
- `GET /api/perfumes` - Get all perfumes (with optional filters)
  - Query params: `scentFamily`, `gender`, `minPrice`, `maxPrice`, `search`, `sort`, `limit`
- `GET /api/perfumes/:id` - Get single perfume by ID
- `POST /api/perfumes` - Create new perfume (admin only - TODO: add auth)
- `PUT /api/perfumes/:id` - Update perfume (admin only - TODO: add auth)
- `DELETE /api/perfumes/:id` - Delete perfume (admin only - TODO: add auth)

## Models

### Perfume
```typescript
{
  name: string;
  brand: string;
  description: string;
  price: number;
  scentFamily: 'floral' | 'woody' | 'oriental' | 'fresh' | 'citrus' | 'gourmand';
  type: 'eau_de_parfum' | 'eau_de_toilette' | 'parfum' | 'cologne';
  gender: 'male' | 'female' | 'unisex';
  fragranceNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  sizes: Array<{ volume: number; price: number; }>;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  inStock: boolean;
}
```

### User
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
}
```

## TODO

- [ ] Add JWT authentication
- [ ] Add user registration/login endpoints
- [ ] Add authorization middleware for admin routes
- [ ] Add input validation with express-validator
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add unit tests
- [ ] Add API documentation (Swagger/OpenAPI)
