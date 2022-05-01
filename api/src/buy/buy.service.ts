import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

//Custom Packages
import { CreateBuyDto } from './dto';
import { UpdateBuyDto } from './dto';
import { Buy } from './buy.entity';
import { ClientService } from 'src/client/client.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Buy)
    private readonly buyRepository: EntityRepository<Buy>,
    private readonly clientService: ClientService,
    private readonly productService: ProductService,
  ) {}

  public async createBuy(dto: CreateBuyDto): Promise<Buy> {
    const buy = new Buy(
      dto,
      await this.clientService.findOne(dto.clientId),
      await this.productService.findOne(dto.productId),
    );
    await this.buyRepository.persistAndFlush(buy);
    return buy;
  }

  public async findAll(): Promise<Buy[]> {
    return this.buyRepository.findAll();
  }

  public async findOne(clientId: number, productId: number): Promise<Buy> {
    return await this.buyRepository.findOneOrFail({
      client: await this.clientService.findOne(clientId),
      product: await this.productService.findOne(productId),
    });
  }

  public async update(dto: UpdateBuyDto, clientId, productId): Promise<Buy> {
    const buy = await this.buyRepository.findOneOrFail({
      client: await this.clientService.findOne(clientId),
      product: await this.productService.findOne(productId),
    });
    wrap(buy).assign(dto);
    await this.buyRepository.flush();
    return buy;
  }

  public async delete(clientId: number, productId: number): Promise<void> {
    await this.buyRepository.removeAndFlush(
      await this.buyRepository.findOneOrFail({
        client: await this.clientService.findOne(clientId),
        product: await this.productService.findOne(productId),
      }),
    );
  }
}
