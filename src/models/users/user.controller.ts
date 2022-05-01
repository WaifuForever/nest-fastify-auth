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

    @Get('find')
    async findOne(
        @Query('id') _id: string,
        @Query('email') _email: string,
    ): Promise<User | undefined> {
        if (_email) return this._service.findByEmail(_email);
        else if (_id) return this._service.findById(_id);
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
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() dto): Promise<object> {
        return this._service.updateById(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<object> {
        return this._service.deleteById(id);
    }
}
