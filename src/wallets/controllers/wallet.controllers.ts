import {
    Controller,
    UseGuards,
    Post,
    Get,
    Patch,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    Param,
    ParseIntPipe,
    Put,
    Body,
  } from '@nestjs/common';
import { WalletsService } from '../services/wallet.services';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard';
import { Wallet } from '../entities/wallet.entity';

@Controller('wallets')
@UseGuards(JWTAuthGuard, SessionAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Wallet>  {
    return this.walletsService.findOne({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }
}
