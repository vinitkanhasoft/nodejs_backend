import { EventEmitter } from 'events';
import { DomainEvent } from './domain.events.ts';

export class EventBus extends EventEmitter {
  publish(event: DomainEvent) {
    this.emit(event.type, event);
  }

  subscribe(eventType: string, listener: (event: DomainEvent) => void) {
    this.on(eventType, listener);
  }
}

export const eventBus = new EventBus();