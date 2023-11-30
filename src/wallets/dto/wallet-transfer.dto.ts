import { IsDefined, IsString, IsNotEmpty, IsEmail, IsNumber, IsBoolean } from "class-validator";

export class WalletTransferDto {
    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly sender_wallet_id;

    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    readonly receiving_wallet_id;

    @IsDefined()
    @IsNumber()
    readonly amount;

}
