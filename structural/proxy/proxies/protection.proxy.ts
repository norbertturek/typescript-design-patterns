import { IProductService } from '../core/product-service.interface';

export class ProtectionProxy implements IProductService {
    constructor(
        private service: IProductService,
        private currentRole: string,
    ) {}

    getProduct(id: string): string {
        if (!this.service.isAllowed(this.currentRole)) {
            console.log(`[ProtectionProxy] Access denied for role "${this.currentRole}"`);
            return '';
        }

        console.log(`[ProtectionProxy] Access granted for role "${this.currentRole}"`);
        return this.service.getProduct(id);
    }

    isAllowed(role: string): boolean {
        return this.service.isAllowed(role);
    }
}
