import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { User } from '../../src/models/users/interfaces/user.interface';
import { USER_1, USER_2 } from '../mocks/user.mock';
import { app } from '../specs/e2e/users/user.spec';

const itif = (condition: boolean) => (condition ? it : it.skip);
type Props = (payload: any, token: string, statusCode: number) => void;

const createUser: Props = (payload, token, statusCode) => {
    describe('tries to create a user', () => {
        const data: User = {
            email: '',
        };
        it('POST /users', async () => {
            const response: request.Response = await request(
                app.getHttpServer(),
            )
                .post('/users')
                .send(payload);

            expect(
                typeof response.body === 'object' &&
                    !Array.isArray(response.body) &&
                    response.body !== null,
            ).toBeTruthy();

          

            switch (payload.n) {
                case 1:
                    USER_1.id = response.body.id;
                    data.email = USER_1.email;
                    break;
                case 2:
                    USER_2.id = response.body.id;
                    data.email = USER_2.email;
                    break;
                default:
                    break;
            }
            switch (statusCode) {
                case 201:
                    expect(response.statusCode).toBe(201);
                    expect(response.body).toMatchObject(data);
                    break;
                case 400:
                    expect(response.statusCode).toBe(400);
                    expect(response.body).toMatchObject({
                        message: 'BadRequest',
                    });
                    break;
                case 404:
                    expect(response.statusCode).toBe(404);
                    expect(response.body).toMatchObject({
                        statusCode: 404,
                        message: 'Not Found',
                    });
                    break;
                case 500:
                    expect(response.statusCode).toBe(500);
                    expect(response.body).toMatchObject({
                        statusCode: 500,
                        message: 'Internal server error',
                    });
                    break;
                default:
                    expect(1).toBe(2);
                    break;
            }
        });

        itif(payload.email)('GET /users/findOne', async () => {
            const response: request.Response = await request(
                app.getHttpServer(),
            ).get(`/users/findOne?email=${payload.email}`);

            expect(
                typeof response.body === 'object' &&
                    !Array.isArray(response.body) &&
                    response.body !== null,
            ).toBeTruthy();

            switch (statusCode) {
                case 201:
                    expect(response.statusCode).toBe(200);
                    expect(response.body).toMatchObject(data);
                    break;
                case 400:
                    expect(response.statusCode).toBe(404);
                    expect(response.body).toMatchObject({
                        statusCode: 404,
                        message: 'Not Found',
                    });
                    break;
                case 404:
                    expect(response.statusCode).toBe(404);
                    expect(response.body).toMatchObject({
                        statusCode: 404,
                        message: 'Not Found',
                    });
                    break;
                case 500:
                    expect(response.statusCode).toBe(404);
                    expect(response.body).toMatchObject({
                        statusCode: 404,
                        message: 'Not Found',
                    });
                    break;
                default:
                    expect(1).toBe(2);
                    break;
            }
        });
    });
};

export { createUser };
