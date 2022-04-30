import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateProductDto } from './dto';
import { UpdateProductDto } from './dto';
import { Product } from './product.entity';
import { ThingTypeService } from 'src/thingType/thingType.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    private readonly thingTypeService: ThingTypeService,
  ) {}

  public async createProduct(dto: CreateProductDto): Promise<Product> {
    if (await this.productRepository.findOne({ name: dto.name })) {
      throw new ConflictException('Name already used');
    }
    const product = new Product(
      dto,
      await this.thingTypeService.findOne(dto.thingTypeId),
    );
    await this.productRepository.persistAndFlush(product);
    return product;
  }

  public async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  public async findOne(thingId: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        thingId,
      });
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  public async update(
    thingId: number,
    dto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail({
        thingId,
      });
      wrap(product).assign(dto);
      await this.productRepository.flush();
      return product;
    } catch {
      throw new NotFoundException('Product not found');
    }
  }

  public async delete(thingId: number): Promise<void> {
    try {
      await this.productRepository.removeAndFlush(
        await this.productRepository.findOneOrFail({
          thingId,
        }),
      );
    } catch {
      throw new NotFoundException('Product not found');
    }
  }
}
