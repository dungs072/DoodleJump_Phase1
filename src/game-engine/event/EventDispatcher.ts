class EventDispatcher {
    private listeners: { [type: string]: ((event: Event) => void)[] } = {}

    addEventListener(type: string, listener: (event: Event) => void): void {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(listener)
    }

    dispatchEvent(type: string, event: Event): void {
        if (this.listeners[type]) {
            this.listeners[type].forEach((listener) => listener(event))
        }
    }
}
export default EventDispatcher
