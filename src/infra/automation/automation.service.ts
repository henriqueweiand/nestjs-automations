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

        return this.commandBus.execute(
            new GenericEventCommand<T>(classRef.name.toLowerCase() + '.' + event, data)
        );
    }
}