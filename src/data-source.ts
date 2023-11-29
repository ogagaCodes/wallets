import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

import { Profile } from './user/entities/profile.entity';
import { User } from './user/entities/user.entity';
import { profileFactory } from './user/factories/profile.factory';
import { userFactory } from './user/factories/user.factory';
import { ProfileSeeder } from './user/seeders/profile.seeder';
import { UserSeeder } from './user/seeders/user.seeder';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Profile],
  migrations: [

  ],
  synchronize: false,
  extra: {
    ssl:
      process.env.SSL_MODE === 'require'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  },
  factories: [userFactory, profileFactory],
  seeds: [UserSeeder, ProfileSeeder],
};

export const appDataSource = new DataSource(dataSourceOptions);
