import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('ContactsController', () => {
    const contactIds: string[] = [];

    it('/ (POST)', (done) => {
      request(app.getHttpServer())
        .post('/')
        .send({ name: 'first', age: 69 })
        .then((response) => {
          const body = response.body;
          contactIds.push(body.id);

          expect(response.status).toBe(201);
          expect(body).toEqual({
            id: expect.any(String),
            name: 'first',
            age: 69,
          });

          done();
        });
    });

    it('/ (GET)', (done) => {
      request(app.getHttpServer())
        .get(`/${contactIds[0]}`)
        .then((response) => {
          const body = response.body;
          contactIds.push(body.id);

          expect(response.status).toBe(200);
          expect(body).toEqual({
            id: expect.any(String),
            name: 'first',
            age: 69,
          });

          done();
        });
    });
  });
});
