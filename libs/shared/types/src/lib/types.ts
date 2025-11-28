/**
 * Perfume Domain Types
 * Shared TypeScript interfaces and types for the Scentify application
 */

// ============================================================================
// Scent & Fragrance Types
// ============================================================================

/**
 * Fragrance families categorizing perfumes by their dominant scent characteristics
 */
export enum ScentFamily {
  FLORAL = 'floral',
  WOODY = 'woody',
  ORIENTAL = 'oriental',
  FRESH = 'fresh',
  GOURMAND = 'gourmand',
  CHYPRE = 'chypre',
  FOUGERE = 'fougere',
}

/**
 * Fragrance note positions in the scent pyramid
 */
export enum NoteType {
  TOP = 'top',
  MIDDLE = 'middle',
  BASE = 'base',
}

/**
 * Individual fragrance note (ingredient)
 */
export interface FragranceNote {
  id: string;
  name: string;
  type: NoteType;
  description?: string;
}

/**
 * Perfume concentration types
 */
export enum PerfumeType {
  PARFUM = 'parfum', // 20-30% concentration
  EAU_DE_PARFUM = 'eau_de_parfum', // 15-20%
  EAU_DE_TOILETTE = 'eau_de_toilette', // 5-15%
  EAU_DE_COLOGNE = 'eau_de_cologne', // 2-5%
  EAU_FRAICHE = 'eau_fraiche', // 1-3%
}

// ============================================================================
// Product Types
// ============================================================================

/**
 * Brand information
 */
export interface Brand {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  country?: string;
  foundedYear?: number;
}

/**
 * Product size variant
 */
export interface ProductSize {
  id: string;
  volume: number; // in ml
  unit: 'ml';
  price: number;
  currency: string;
  sku: string;
  stockQuantity: number;
  isAvailable: boolean;
}

/**
 * Main product (perfume) entity
 */
export interface Product {
  id: string;
  name: string;
  brandId: string;
  brand?: Brand;
  description: string;
  type: PerfumeType;
  scentFamily: ScentFamily;
  fragranceNotes: FragranceNote[];
  sizes: ProductSize[];
  images: string[];
  releaseDate?: Date;
  gender: 'male' | 'female' | 'unisex';
  averageRating?: number;
  reviewCount?: number;
  longevity?: number; // hours
  sillage?: 'intimate' | 'moderate' | 'strong' | 'enormous';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// User Types
// ============================================================================

/**
 * User role in the system
 */
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Admin User entity for user management
 */
export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

/**
 * User address
 */
export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: 'shipping' | 'billing';
}

// ============================================================================
// Order Types
// ============================================================================

/**
 * Order status
 */
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

/**
 * Payment method
 */
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
}

/**
 * Order item
 */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productSizeId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Order entity
 */
export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  shippingAddressId: string;
  shippingAddress?: Address;
  billingAddressId: string;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Review Types
// ============================================================================

/**
 * Product review
 */
export interface Review {
  id: string;
  userId: string;
  user?: User;
  productId: string;
  product?: Product;
  rating: number; // 1-5
  title?: string;
  comment: string;
  longevityRating?: number; // 1-5
  sillageRating?: number; // 1-5
  valueRating?: number; // 1-5
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Cart & Wishlist Types
// ============================================================================

/**
 * Shopping cart item
 */
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  productSizeId: string;
  product?: Product;
  quantity: number;
  addedAt: Date;
}

/**
 * Shopping cart
 */
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Wishlist item
 */
export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  product?: Product;
  addedAt: Date;
}

/**
 * User wishlist (Perfume Wardrobe)
 */
export interface Wishlist {
  id: string;
  userId: string;
  name: string; // e.g., "My Collection", "Summer Scents"
  items: WishlistItem[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Paginated response
 */
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

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

/**
 * API success response
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: ApiError;
}

// ============================================================================
// Convenience Types
// ============================================================================

/**
 * Simplified fragrance notes structure
 */
export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

/**
 * Simplified perfume type for client-side use
 */
export interface Perfume {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  type: PerfumeType;
  scentFamily: ScentFamily;
  gender: 'male' | 'female' | 'unisex';
  sizes: Array<{ volume: number; price: number; stock: number }>;
  fragranceNotes: FragranceNotes;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}
