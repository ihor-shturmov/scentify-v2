import {
    Controller,
    Get,
    Param,
    Patch,
    Delete,
    Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UpdateUserDto } from './dto/user-response.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        // toJSON transformation happens automatically
        return users.map(user => user.toJSON() as UserResponseDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.usersService.findOne(id);
        // toJSON transformation happens automatically
        return user.toJSON() as UserResponseDto;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateUserDto
    ): Promise<UserResponseDto> {
        const user = await this.usersService.update(id, updateData);
        // toJSON transformation happens automatically
        return user.toJSON() as UserResponseDto;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.usersService.remove(id);
        // toJSON transformation happens automatically
        return user.toJSON() as UserResponseDto;
    }
}
