import { Global, Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { AutomationService } from './automation.service';
import { GenericEventCommandHandler } from './commands/genericEvent.command-handler';
import { ProductCreatedEventHandler } from './events/productCreatedEvent';

@Global()
@Module({
  imports: [
    CqrsModule.forRoot(),
  ],
  providers: [
    AutomationService,
    GenericEventCommandHandler,
    ProductCreatedEventHandler,
  ],
  exports: [
    AutomationService
  ],
})
export class AutomationModule { }
