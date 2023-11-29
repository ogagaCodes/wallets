import { IsDefined, IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly name;

    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    readonly email;

    @IsDefined()
    @IsString()
    readonly password;

}
