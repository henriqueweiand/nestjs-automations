import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class ProductCreatedEventEvent {
    constructor(public readonly data: any) { }
}

@EventsHandler(ProductCreatedEventEvent)
export class ProductCreatedEventHandler implements IEventHandler<ProductCreatedEventEvent> {
    handle(event: ProductCreatedEventEvent) {
        console.log('ProductCreatedEventHandler', event);
    }
}