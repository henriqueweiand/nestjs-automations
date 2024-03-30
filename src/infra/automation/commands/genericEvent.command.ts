export class GenericEventCommand<T> {
    constructor(
        public readonly event: string,
        public readonly data: T
    ) { }
}