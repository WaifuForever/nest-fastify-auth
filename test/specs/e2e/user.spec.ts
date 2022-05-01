import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { getConnection } from 'typeorm';
import { createUser } from '../../helpers/user.helper';

import * as request from 'supertest';
import { bootstrapTest } from '../../apps/user.app';
import { USER_1 } from '../../mocks/user.mock';

describe('UserController (e2e)', () => {
    let app: NestFastifyApplication;

    beforeAll(async () => {
        app = await bootstrapTest();

        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    afterAll(async () => {
        const entities = getConnection().entityMetadatas;

        for (const entity of entities) {
            const repository = getConnection().getRepository(entity.name); // Get repository
            await repository.clear(); // Clear each entity table's content
        }
        await app.close();
    });

    describe('should accept', () => {
        it('POST /users', async () => {
            const response = await request(app.getHttpServer())
                .post('/users')
                .send(USER_1);

            console.log(response.text);
            switch (201) {
                case 201:
                    break;
            }
        });
        
    });
});
