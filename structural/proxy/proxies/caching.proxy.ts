import { IProductService } from '../core/product-service.interface';

export class CachingProxy implements IProductService {
    private cache: Map<string, string> = new Map();

    constructor(private service: IProductService) {}

    getProduct(id: string): string {
        if (this.cache.has(id)) {
            console.log(`[CachingProxy] Cache hit for ${id}`);
            return this.cache.get(id)!;
        }

        const result = this.service.getProduct(id);
        this.cache.set(id, result);
        console.log(`[CachingProxy] Cached result for ${id}`);
        return result;
    }

    isAllowed(role: string): boolean {
        return this.service.isAllowed(role);
    }
}
