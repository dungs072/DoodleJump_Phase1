class EventDispatcher<T> {
    private listeners: { [type: string]: ((event: Event, data: T) => void)[] } = {}

    public addEventListener(type: string, listener: (event: Event, data: T) => void): void {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(listener)
    }

    public dispatchEvent(type: string, event: Event, data: T): void {
        if (this.listeners[type]) {
            this.listeners[type].forEach((listener) => listener(event, data))
        }
    }
}
export default EventDispatcher
