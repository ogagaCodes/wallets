import { IsDefined, IsString, IsNotEmpty, IsEmail, IsNumber, IsBoolean } from "class-validator";

export class FundWalletDto {
    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly wallet_id;

    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly user_id;

    @IsDefined()
    @IsNumber()
    readonly amount;

    @IsDefined()
    @IsString()
    readonly fund_channel;

}
