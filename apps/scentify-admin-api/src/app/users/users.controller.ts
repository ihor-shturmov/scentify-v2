import {
    Controller,
    Get,
    Param,
    Patch,
    Delete,
    Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateData: Partial<User>
    ): Promise<User | null> {
        return this.usersService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<User | null> {
        return this.usersService.remove(id);
    }
}
