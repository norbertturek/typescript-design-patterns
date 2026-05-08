export interface Order {
    id: string;
    product: string;
    priority: number; // 1 = low, 10 = high (VIP)
}
