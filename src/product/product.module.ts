import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SharedModule } from '../shared/shared.module';
import { ProductListener } from './listeners/product-listener';

@Module({
imports:[
    TypeOrmModule.forFeature([Product]),
    SharedModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductListener],
  exports: [TypeOrmModule, ProductService]
})
export class ProductModule {}
