import EventHandler from '../types/eventHandler'

class EventDispatcher {
    private eventHandlers: Map<string, EventHandler[]> = new Map()

    public addEventListener(eventType: string, handler: EventHandler): void {
        if (!this.eventHandlers.has(eventType)) {
            this.eventHandlers.set(eventType, [])
        }
        this.eventHandlers.get(eventType)!.push(handler)
    }
    public removeEventListener(eventType: string, handler: EventHandler): void {
        if (!this.eventHandlers.has(eventType)) return

        const handlers = this.eventHandlers.get(eventType)
        const handlerIndex = handlers!.indexOf(handler)
        if (handlerIndex !== -1) {
            handlers!.splice(handlerIndex, 1)
        }
    }

    public dispatchEvent(eventType: string, ...args: any[]): void {
        if (!this.eventHandlers.has(eventType)) return

        const handlers = this.eventHandlers.get(eventType)!
        for (const handler of handlers) {
            handler(...args)
        }
    }
}

export default EventDispatcher
