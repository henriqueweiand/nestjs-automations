import { ProductRepository } from '@app/application/ports/product.repositoy';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EnvModule } from '@app/infra/env';

// Non exported
import { PrismaProductRepository } from './repositories/prisma-product.repositoy';

@Global()
@Module({
    imports: [EnvModule],
    providers: [
        PrismaService,
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository,
        },
    ],
    exports: [PrismaService, ProductRepository],
})
export class PrismaModule { }
