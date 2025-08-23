import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';

jest.setTimeout(30000);

describe('App e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGO_URL = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (dataSource) await dataSource.destroy();
    if (app) await app.close();
    if (mongod) await mongod.stop();
  });

  it('GET /api/form-configs returns empty array', () => {
    return request(app.getHttpServer())
      .get('/api/form-configs')
      .expect(200)
      .expect([]);
  });
});
