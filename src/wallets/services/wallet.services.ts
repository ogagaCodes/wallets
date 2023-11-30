import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { FundWalletDto } from '../dto/fund-wallet.dto';
import { WalletTransferDto } from '../dto/wallet-transfer.dto';

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

  async fund(data: FundWalletDto) {
    const id = data.wallet_id;
    const wallet = await this.walletRepository.findOneBy({ id });

    if (!wallet) {
      throw new NotFoundException(`Wallet Does Not Exist`);
    }
    const fundData  = {
        id: data.wallet_id,
        user_id: data.user_id,
        wallet_balance: wallet.wallet_balance + data.amount, 
    }
    this.walletRepository.merge(wallet, fundData);

    return this.walletRepository.save(wallet);
  }

  async transfer(data: WalletTransferDto) {
    // check if sending wallte exists
    const id = data.sender_wallet_id;
    const sendingWallet = await this.walletRepository.findOneBy({ id });




    if (!sendingWallet) {
      throw new NotFoundException(`The Sending Account is Compromised, Contact SUpport`);
    } else{
            // check if receiving wallet exists
    const id = data.sender_wallet_id;
    const recievingWallet = await this.walletRepository.findOneBy({ id });
    if (!recievingWallet) {
        throw new NotFoundException(`The Receiving Account  Account Does Not Exist`);
      }
    //  debit sending wallet
    const debitData = {
        id: data.sender_wallet_id,
        wallet_balance: sendingWallet.wallet_balance - data.amount,
    }
    this.walletRepository.merge(sendingWallet, debitData);
    this.walletRepository.save(sendingWallet)
    // credit recievinfg wallet
    const creditData = {
        id: data.receiving_wallet_id,
        wallet_balance: recievingWallet.wallet_balance + data.amount,
    }
    this.walletRepository.merge(recievingWallet, creditData);

    this.walletRepository.save(recievingWallet);
    // save transations
    
    return {message:"success"}
    }

  }
}
