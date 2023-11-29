import { setSeederFactory } from 'typeorm-extension';

import { Profile } from '../entities/profile.entity';

export const profileFactory = setSeederFactory(Profile, faker => {
  const profile = new Profile();
  profile.phone = faker.phone.number();
  return profile;
});
