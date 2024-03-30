import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GenericEventCommand } from './commands/genericEvent.command';

export enum AutomationEvents {
    CREATED = 'created',
    UPDATED = 'updated',
    DELETED = 'deleted',
    FIELD_CHANGED = 'field_changed',
}

@Injectable()
export class AutomationService {

    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    eventEmit<T>(event: string, data: T) {
        const classRef = data.constructor;

        switch (event) {
            case AutomationEvents.CREATED:
                return this.commandBus.execute(
                    new GenericEventCommand<T>(classRef.name.toLowerCase() + '.' + AutomationEvents.CREATED, data)
                );
            case AutomationEvents.UPDATED:
                return this.commandBus.execute(
                    new GenericEventCommand<T>(classRef.name.toLowerCase() + '.' + AutomationEvents.UPDATED, data)
                );
            case AutomationEvents.DELETED:
                return this.commandBus.execute(
                    new GenericEventCommand<T>(classRef.name.toLowerCase() + '.' + AutomationEvents.DELETED, data)
                );

            case AutomationEvents.FIELD_CHANGED:
                return this.commandBus.execute(
                    new GenericEventCommand<T>(classRef.name.toLowerCase() + '.' + AutomationEvents.FIELD_CHANGED, data)
                );

            default:
                throw new Error('Event not found');
        }
    }
}