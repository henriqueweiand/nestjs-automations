import { CreateProductUseCase } from '@app/application/use-case/create-product';
import { GetProductUseCase } from '@app/application/use-case/get-product';
import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('/product')
@ApiTags('Product')
export class ProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private getProductUseCase: GetProductUseCase,
    ) { }

    @Get('')
    async getAll() {
        const response = this.getProductUseCase.execute({});
        return response;
    }

    @Post('')
    create(@Body() createProductDto: CreateProductDto) {
        const response = this.createProductUseCase.execute(createProductDto);
        return response;
    }
}
