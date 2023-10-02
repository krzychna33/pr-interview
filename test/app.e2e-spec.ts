import { ContactService } from '@app/core/database/contact/contact.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AddressService } from '@database/address/address.service';
import { IAddress } from '@core/models/address.model';
import { json, urlencoded } from 'express';

describe('App e2e', () => {
  let app: INestApplication;
  let contactService: ContactService;
  let addressService: AddressService;
  let contactId: string;
  let contactAddresses: IAddress[];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then();
    app = moduleFixture.createNestApplication();
    app.use(json({ limit: '50mb' }));
    await app.init();
    contactService = moduleFixture.get(ContactService);
    addressService = moduleFixture.get(AddressService);
  });

  it('should init app', () => {
    expect(app).toBeTruthy();
  });

  describe('ContactsController', () => {
    const contact = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'bad@email.com',
      phoneNumber: '+48500100200',
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

    const contactBadDto = {
      firstName: 'first',
      lastName: 'last',
      age: 55,
      email: 'bad.email.com',
      phoneNumber: '+123',
    };

    it('should throw validation error on /contacts (POST)', (done) => {
      request(app.getHttpServer())
        .post('/contacts/')
        .send(contactBadDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          const body = response.body;

          expect(body.message).toContain('email must be an email');
          expect(body.message).toContain(
            'phoneNumber must be a valid phone number',
          );
        })
        .end(done);
    });

    it('should get by /contacts/:id (GET)', (done) => {
      const id = contactId;
      request(app.getHttpServer())
        .get(`/contacts/${id}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({ ...contact, id, addresses: [] });
        })
        .end(done);
    });

    it('should create new addresses', (done) => {
      const createAddressesDto = {
        addresses: [
          {
            address: 'xx',
            city: 'xxx',
            postalCode: 'xx-xxx',
          },
          {
            address: 'xx1',
            city: 'xxx1',
            postalCode: 'xx-xxx1',
          },
        ],
      };
      request(app.getHttpServer())
        .post(`/contacts/${contactId}/addresses/many`)
        .send(createAddressesDto)
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body).toEqual(
            createAddressesDto.addresses.map((c) => ({
              ...c,
              id: expect.any(String),
            })),
          );
          contactAddresses = response.body;
        })
        .end(done);
    });

    it('should get by /contacts/:id (GET) with created address', (done) => {
      const id = contactId;
      request(app.getHttpServer())
        .get(`/contacts/${id}`)
        .expect(200)
        .expect((response) => {
          expect(response.body).toEqual({
            ...contact,
            id,
            addresses: contactAddresses,
          });
        })
        .end(done);
    });

    it('should create 10000 contacts', (done) => {
      const createManyContactsDto = {
        contacts: [...Array(1000).keys()].map((dto, idx) => ({
          firstName: `firstName${idx}`,
          lastName: `lastName${idx}`,
          age: Math.round(Math.random() * 100),
          email: `email${idx}@example.com`,
          phoneNumber: '+48500100200',
        })),
      };

      request(app.getHttpServer())
        .post('/contacts/many')
        .send(createManyContactsDto)
        .expect(201)
        .expect((response) => {
          const body = response.body;

          console.log(body);

          expect(body).toEqual(
            createManyContactsDto.contacts.map((dto) => ({
              ...dto,
              id: expect.any(String),
            })),
          );
          expect(body.length).toEqual(createManyContactsDto.contacts.length);
        })
        .end(done);
    });
  });

  afterAll(async () => {
    await contactService['contactRepository'].delete({});
    app.close();
  });
});
