import PublisherInterface from '../../types/observer/publisher'
import SubscriberInterface from '../../types/observer/subcriber'

class Publisher<T> implements PublisherInterface<T> {
    private subscribers: SubscriberInterface<T>[] = []
    private data: T
    public subscribe(subscriber: SubscriberInterface<T>): void {
        this.subscribers.push(subscriber)
    }
    public unsubscribe(subscriber: SubscriberInterface<T>): void {
        const index = this.subscribers.indexOf(subscriber)
        if (index > -1) {
            this.subscribers.splice(index, 1)
        }
    }
    public notify(): void {
        for (let subscriber of this.subscribers) {
            subscriber.receive(this.data)
        }
    }
    public setData(data: T): void {
        this.data = data
    }
    public getData(): T {
        return this.data
    }
    public getSubscribers(): SubscriberInterface<T>[] {
        return this.subscribers
    }
}
export default Publisher
