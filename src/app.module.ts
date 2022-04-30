import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/configuration.module';

const ENV = process.env.NODE_ENV;
console.log(ENV);
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        AppConfigModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
