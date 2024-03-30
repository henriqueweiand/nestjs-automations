import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from '@app/application/use-case/create-product';
import { GetProductUseCase } from '@app/application/use-case/get-product';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [CreateProductUseCase, GetProductUseCase],
  exports: [],
})
export class HttpModule { }
