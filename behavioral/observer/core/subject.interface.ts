import { Observer } from './observer.interface';

export interface Subject<T> {
    subscribe(event: string, observer: Observer<T>): void;
    unsubscribe(event: string, observer: Observer<T>): void;
    notify(event: string, data: T): void;
}
