export interface OrderComponent {
    getName(): string;
    getPrice(): number;
    print(indent?: string): void;
}
