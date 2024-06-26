import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { GenericEventCommand } from './genericEvent.command';
import { LazyModuleLoader } from '@nestjs/core';
import { ProductCreatedEventEvent } from '../events/productCreatedEvent';

@CommandHandler(GenericEventCommand)
export class GenericEventCommandHandler
    implements ICommandHandler<GenericEventCommand<any>>
{
    constructor(
        private readonly lazyModuleLoader: LazyModuleLoader,
        private eventBus: EventBus,
    ) { }

    async execute(command: GenericEventCommand<any>) {
        const actionModuleRef = await this.lazyModuleLoader.load(() =>
            import('../actions/actions.module').then((m) => m.ActionsModule),
        );

        // improve organization and segmentation of folders to be to be able to have modules for a better danimyc code 
        // how can i handle errors here?
        // should repository implement transactions?

        const actionModule = await import(`../actions/${command.event}`);
        const ActionClass = actionModule.default;

        const action = actionModuleRef.get(ActionClass);
        const created = action.execute(command.data);

        this.eventBus.publish(new ProductCreatedEventEvent(created));
    }
}