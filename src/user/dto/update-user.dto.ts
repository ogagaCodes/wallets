import { IsDefined, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserUpdate {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly name;

    @IsDefined()
    @IsString()
    readonly password;

}

