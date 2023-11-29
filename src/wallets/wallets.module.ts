import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WalletsService } from './services/wallet.services';
import { WalletsController } from './controllers/wallet.controllers';

@Module({
  imports: [
    UserModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
