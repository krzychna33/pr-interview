import { ContactService } from '@app/core/database/contact/contact.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  let contactService: ContactService;
  let contactId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then();
    app = moduleFixture.createNestApplication();
    await app.init();
    contactService = moduleFixture.get(ContactService);
  });

  it('should init app', () => {
    expect(app).toBeTruthy();
  });

  describe('ContactsController', () => {
    const contact = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'bad.email',
    };

    it('should create by /contacts (POST)', (done) => {
      request(app.getHttpServer())
        .post('/contacts/')
        .send(contact)
        .expect(201)
        .expect((response) => {
          const body = response.body;
          contactId = body.id;

          expect(body).toEqual({ ...contact, id: expect.any(String) });
        })
        .end(done);
    });

    it('should get by /contacts/:id (GET)', (done) => {
      const id = contactId;
      request(app.getHttpServer())
        .get(`/contacts/${id}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({ ...contact, id });
        })
        .end(done);
    });
  });

  afterAll(async () => {
    await contactService['contactRepository'].delete({});
    app.close();
  });
});
