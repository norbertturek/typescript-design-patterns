import { IProductService } from '../core/product-service.interface';

export class ProductService implements IProductService {
    getProduct(id: string): string {
        console.log(`[ProductService] Fetching product ${id} from database...`);
        return `Product(${id})`;
    }

    isAllowed(role: string): boolean {
        return role === 'admin' || role === 'manager';
    }
}
