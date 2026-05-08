import { Prototype } from '../core/prototype.interface';

export class ShapeRegistry {
    private prototypes: Map<string, Prototype<unknown>> = new Map();

    register(key: string, prototype: Prototype<unknown>): void {
        this.prototypes.set(key, prototype);
    }

    clone<T>(key: string): T {
        const prototype = this.prototypes.get(key);
        if (!prototype) {
            throw new Error(`Prototype with key "${key}" not found in registry.`);
        }
        return prototype.clone() as T;
    }
}
