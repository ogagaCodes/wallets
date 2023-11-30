import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entities/user.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { CreateWalletDto } from 'src/wallets/dto/create-wallet.dto';
import { SignUp } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/services/user.service';
import { WalletsService } from '../wallets/services/wallet.services';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUp: SignUp): Promise<User> {
    const user = await this.userService.create(signUp);
    const newWalletData : CreateWalletDto = {
      user_id: user.id,
      wallet_balance: 0,
      is_blocked: false,
    }
    const wallet = await this.walletService.create(newWalletData)
    delete user.password;
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({ where: { email: payload.sub } });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
