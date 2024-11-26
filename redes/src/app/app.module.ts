import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Change this to your DB type
      port:3306,
      username: 'user',
      password:'Password132#',
      database: 'redes',
      entities: [Item],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/frontend'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}