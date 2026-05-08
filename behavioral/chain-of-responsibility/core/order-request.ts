export interface OrderRequest {
    userId: string;
    productId: string;
    amount: number;
    isAuthenticated: boolean;
    inStock: boolean;
    isFraudulent: boolean;
}
