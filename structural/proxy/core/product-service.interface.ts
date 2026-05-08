export interface IProductService {
    getProduct(id: string): string;
    isAllowed(role: string): boolean;
}
