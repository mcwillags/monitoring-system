import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ObserversModule } from './observers/observers.module';
import { AdminsModule } from './admins/admins.module';
import { GatewayModule } from './gateway/gateway.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vrdxxen.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UserModule,
    ObserversModule,
    AdminsModule,
    GatewayModule,
    DataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
