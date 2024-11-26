import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './entities/item.entity';

@Controller('items')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() item: Partial<Item>): Promise<Item> {
    return this.appService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() item: Partial<Item>): Promise<Item> {
    return this.appService.update(id, item);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.appService.delete(id);
  }
}