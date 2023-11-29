import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  import { User } from '../../user/entities/user.entity';
  
  @Entity()
  export class Wallet {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    wallet_balance: number;

    @Column()
    is_blocked: boolean;
  }
  