import { IsDefined, IsString, IsNotEmpty, IsEmail, IsNumber, IsBoolean } from "class-validator";

export class CreateWalletDto {
    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly user_id;

    @IsDefined()
    @IsNumber()
    readonly wallet_balance;

    @IsDefined()
    @IsBoolean()
    readonly is_blocked;

}
