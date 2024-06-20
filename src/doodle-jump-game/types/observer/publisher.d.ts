import SubcriberInterface from './subcriber'

interface PublisherInterface<T> {
    subscribe(subcriber: SubcriberInterface<T>): void
    unsubscribe(subcriber: SubcriberInterface<T>): void
    notify(): void
}
export default PublisherInterface
