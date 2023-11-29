import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { CreateWalletDto } from '../dto/create-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  async create(createWalletDto: CreateWalletDto) {
    const user = this.walletRepository.create(createWalletDto);

    return this.walletRepository.save(user);
  }


  async findOne(where: FindOneOptions<Wallet>): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(where);

    if (!wallet) {
      throw new NotFoundException(
        `There isn't any wallet with identifier: ${where}`,
      );
    }
    return wallet;
  }

  async update(id: number, updates: UpdateWalletDto) {
    const wallet = await this.walletRepository.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException(`There isn't any wallet with id: ${id}`);
    }

    this.walletRepository.merge(wallet, updates);

    return this.walletRepository.save(wallet);
  }
}
