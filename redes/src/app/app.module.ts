import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';

@Module({
  
  imports: [
    // Import ConfigModule to load .env variables
    ConfigModule.forRoot({
      isGlobal: true,  // Makes config globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: 'redes',
        entities: [Item],
        synchronize: true,  // Set to false for production to avoid data loss
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}