import SubcriberInterface from './subcriber'

interface PublisherInterface<T> {
    subscribe(subcriber: SubcriberInterface<T>): void
    unsubcribe(subcriber: SubcriberInterface<T>): void
    notify(): void
}
export default PublisherInterface
