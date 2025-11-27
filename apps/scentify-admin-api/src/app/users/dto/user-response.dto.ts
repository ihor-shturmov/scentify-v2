/**
 * Data Transfer Objects for User API responses
 */

/**
 * User response DTO
 * This is the shape of user data returned from the API
 */
export interface UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Update user DTO
 * Allowed fields for updating a user
 */
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'admin' | 'user';
    isActive?: boolean;
    lastLogin?: Date;
}
