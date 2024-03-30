import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { HttpModule } from './infra/http/http.module';
import { PrismaModule } from './infra/persistence/prisma/prisma.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PrismaModule,
    HttpModule,
  ],
})
export class AppModule { }
