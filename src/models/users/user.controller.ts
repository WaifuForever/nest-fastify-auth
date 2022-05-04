import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private _service: UserService) {}

    @Post()
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
        }),
    )
    async create(@Body() User): Promise<User> {
        return this._service.createUser(User);
    }

    @Get('findOne')
    async findOne(
        @Query('id') id: string,
        @Query('email') email: string,
    ): Promise<User | undefined> {
        if (email) return this._service.findByEmail(email);
        else if (id) return this._service.findById(id);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this._service.findAllUsers();
    }

    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            skipMissingProperties: true,
        }),
    )
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<object> {
        return this._service.deleteById(id);
    }
}
