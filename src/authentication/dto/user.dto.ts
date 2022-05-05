import { Type } from 'class-transformer';
import {
    Equals,
    IsDate,
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxDate,
    ValidateIf,
} from 'class-validator';
import { IsValidPassword } from '../../common/decorators/is.valid.password';

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @Length(8)
    @IsValidPassword()
    password: string;
}
