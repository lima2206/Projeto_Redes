import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  create(item: Partial<Item>): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async update(id: number, updateItemDto: any): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new Error('Item not found');
    }
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}