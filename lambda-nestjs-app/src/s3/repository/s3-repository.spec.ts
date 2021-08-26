import { S3Repository } from './s3-repository';
import { Test } from '@nestjs/testing';
import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

interface User {
  id: string | number;
  name: string;
}

@Injectable()
class UserRepository extends S3Repository<User> {
  constructor(protected readonly s3Client: S3Client) {
    super(s3Client);
    this.path = 'users.json';
    this.bucket = 'mzpw-staging';
  }
}

describe('S3Repository', () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: S3Client,
          useFactory: () =>
            new S3Client({
              region: 'us-east-1',
            }),
        },
        UserRepository,
      ],
    }).compile();

    userRepo = moduleRef.get<UserRepository>(UserRepository);
    await userRepo.load();
  });

  describe('List / Find', () => {
    it('all the data should be loaded', async () => {
      const users = await userRepo.listAll();
      console.log(users);
      expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it('find by id', async () => {
      const user = await userRepo.find('idxxxx1');
      console.log(user);
      expect(user).toBeDefined();

      const userNotFound = await userRepo.find('hehe');
      console.log(userNotFound);
      expect(userNotFound).toBeUndefined();
    });
  });

  describe('Modify', () => {
    it('insert', async () => {
      const newUser: User = {
        id: 'hehe',
        name: 'huhu',
      };

      await userRepo.insert(newUser);

      const updatedDataUser = await userRepo.find(newUser.id);
      expect(newUser).toEqual(updatedDataUser);

      console.log('users before save', await userRepo.listAll());

      await userRepo.save();
      await userRepo.load();
      console.log('users after save', await userRepo.listAll());
    });
  });
});
