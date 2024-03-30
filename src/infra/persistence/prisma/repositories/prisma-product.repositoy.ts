import { ProductRepository } from "@app/application/ports/product.repositoy";
import { Product } from "@app/domain/product";
import { Injectable } from "@nestjs/common";
import { PrismaProductMapper } from "../mapper/prisma-product-mapper";
import { PrismaService } from "../prisma.service";
import { AutomationEvents, AutomationService } from "@app/infra/automation/automation.service";

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(
        private prisma: PrismaService,
        private automation: AutomationService
    ) { }

    async findMany(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();

        return products.map((item) => PrismaProductMapper.toDomain(item));
    }

    async create(product: Product): Promise<Product> {
        const data = PrismaProductMapper.toPrisma(product);
        const entity = await this.prisma.product.create({ data });

        const domain = PrismaProductMapper.toDomain(entity);
        this.automation.eventEmit<Product>(AutomationEvents.CREATED, domain);

        return domain;
    }
}