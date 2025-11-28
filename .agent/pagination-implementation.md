# Pagination Implementation for Perfumes Admin

## Overview
Added comprehensive pagination support to the perfumes management system in the admin panel.

## Shared Types

The `PaginatedResponse<T>` interface is now a **global shared type** located in `@scentify/shared-types`. This ensures type consistency across both frontend and backend applications.

**Location**: `/libs/shared/types/src/lib/types.ts`

```typescript
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
```

This type is imported and used by:
- ✅ Backend API service (`scentify-admin-api`)
- ✅ Frontend service (`scentify-admin`)
- ✅ Frontend store (`scentify-admin`)


## Changes Made

### 1. Backend API (NestJS)

#### Controller (`perfumes.controller.ts`)
- Added `@Query` decorator to accept pagination parameters
- Updated `getPerfumes()` to accept `page` and `limit` query parameters
- Default values: page=1, limit=10

#### Service (`perfumes.service.ts`)
- Modified `findAll()` to accept `page` and `limit` parameters
- Returns paginated response with metadata:
  ```typescript
  {
    data: Perfume[],
    pagination: {
      page: number,
      limit: number,
      total: number,
      totalPages: number,
      hasNextPage: boolean,
      hasPreviousPage: boolean
    }
  }
  ```

#### Repository (`perfume.repository.ts`)
- Updated `findAll()` to accept `skip` and `limit` parameters
- Added `count()` method to get total number of perfumes
- Uses MongoDB's `.skip()` and `.limit()` for efficient pagination

#### Repository Interface (`perfume.repository.interface.ts`)
- Updated interface to match implementation
- Added `count()` method signature

### 2. Frontend (Angular)

#### Service (`perfumes.service.ts`)
- Imports `PaginatedResponse<T>` from `@scentify/shared-types`
- Updated `getPerfumes()` to accept `page` and `limit` parameters
- Returns `Observable<PaginatedResponse<Perfume>>`
- Sends query parameters to API

#### Store (`perfumes.store.ts`)
- Added pagination state:
  ```typescript
  pagination: {
    page: number,      // Current page (default: 1)
    limit: number,     // Items per page (default: 12)
    total: number,     // Total items
    totalPages: number // Total pages
  }
  ```
- Updated `loadPerfumes()` to accept optional page parameter
- Automatically updates pagination state from API response

#### Component (`perfume-list.component.ts`)
- Added pagination controls UI with:
  - Info display (showing X to Y of Z perfumes)
  - Previous/Next buttons
  - Page number buttons (max 5 visible)
  - Active page highlighting
  - Disabled state for unavailable pages
- Added methods:
  - `onPageChange(page)`: Loads perfumes for specific page
  - `getPageNumbers()`: Generates array of page numbers to display
- Auto-scrolls to top when changing pages

## API Usage

### Request
```
GET /perfumes?page=2&limit=12
```

### Response
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 12,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}
```

## Features

✅ Server-side pagination for efficient data loading
✅ Configurable page size (default: 12 items)
✅ Page number navigation
✅ Previous/Next buttons
✅ Smart page number display (shows max 5 pages)
✅ Pagination info (showing X to Y of Z)
✅ Disabled states for unavailable pages
✅ Auto-scroll to top on page change
✅ Responsive design
✅ Loading states

## Testing

1. Navigate to the perfumes list in admin panel
2. Verify pagination controls appear when there are multiple pages
3. Click page numbers to navigate
4. Use Previous/Next buttons
5. Verify correct data loads for each page
6. Check that pagination info updates correctly
