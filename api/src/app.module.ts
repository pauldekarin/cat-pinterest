//app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesModule } from './likes/likes.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: "./.env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        username: 'postgres',
        password: '1',
        database: 'support_lk_db',
        host:'cat-pinterest-api-pg',
        port:5432,
        entities:[__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize:true,
        autoLoadEntities:true,
        logging:true
      })
    }),
    
    UsersModule, 
    LikesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
