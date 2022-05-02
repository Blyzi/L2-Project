import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, BadRequestException } from '@nestjs/common';
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
    //If all the informations have been provided:
    if (
      (await this.clientService.findOne(dto.clientId)) &&
      (await this.productService.findOne(dto.productId))
    ) {
      // If there isn't enough stock left
      if (
        (await this.productService.findOne(dto.productId)).stock - dto.amount <
        0
      ) {
        throw new BadRequestException('Stock Empty');
      }

      // Else if everything is good
      else {
        console.log('test');
        const buy = new Buy(dto);
        console.log(buy.buyId);
        buy.client = await this.clientService.findOne(dto.clientId);
        buy.product = await this.productService.findOne(dto.productId);
        buy.product.stock -= dto.amount; // a certain amount of item is sold so we remove them from the db
        buy.sellPrice = buy.product.price;
        await this.buyRepository.persistAndFlush(buy);
        return buy;
      }
    }
  }

  public async findAll(): Promise<Buy[]> {
    return this.buyRepository.findAll();
  }

  public async findOne(buyId: number): Promise<Buy> {
    return await this.buyRepository.findOneOrFail({ buyId });
  }

  public async update(buyId: number, dto: UpdateBuyDto): Promise<Buy> {
    const buy = await this.buyRepository.findOneOrFail({ buyId });
    wrap(buy).assign(dto);
    await this.buyRepository.flush();
    return buy;
  }

  public async delete(buyId: number): Promise<void> {
    await this.buyRepository.removeAndFlush(
      await this.buyRepository.findOneOrFail({ buyId }),
    );
  }
}
