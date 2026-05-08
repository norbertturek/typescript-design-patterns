import { Iterator } from './iterator.interface';

export interface IterableCollection<T> {
    createAscendingIterator(): Iterator<T>;
    createDescendingIterator(): Iterator<T>;
}
