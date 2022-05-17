import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DatabaseService } from '@app/core/database/database.service';

describe('App e2e', () => {
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then();

    app = moduleFixture.createNestApplication();
    await app.init();

    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
  });

  it('should init app', () => {
    expect(app).toBeTruthy();
  });

  describe('ContactsController', () => {
    const contactIds: string[] = [];
    const contact = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'bad.email',
    };

    it('/contacts (POST)', (done) => {
      console.time('test');
      request(app.getHttpServer())
        .post('/contacts/')
        .send(contact)
        .expect(201)
        .expect((response) => {
          const body = response.body;
          contactIds.push(body.id);

          expect(body).toEqual({ ...contact, id: expect.any(String) });

          console.timeEnd('test');
        })
        .end(done);
    });

    it('/contacts (GET)', (done) => {
      const id = contactIds[0];
      request(app.getHttpServer())
        .get(`/contacts/${id}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({ ...contact, id });
        })
        .end(done);
    });
  });

  afterAll((done) => {
    databaseService.contactsDeleteAll().subscribe(async () => {
      await app.close();
      done();
    });
  });
});
