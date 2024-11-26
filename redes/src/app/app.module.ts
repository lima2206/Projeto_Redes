import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');


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
    

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/frontend'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule {}