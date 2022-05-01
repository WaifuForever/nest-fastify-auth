import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';

interface Props {
    payload: any;
    token: any;
    statusCode: number;
    app: NestFastifyApplication;
}

const createUser = (payload, token, statusCode, app) => {
    describe('tries to create a user', () => {
        it('POST /users', async () => {
            const response = await request(app.getHttpServer())
                .post('/users');
               
            console.log(response);
            switch(statusCode){
                case 201: 
                    break;
            }
            
        });
    })
   
};

export { createUser };
