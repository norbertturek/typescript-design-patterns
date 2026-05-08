import { Product } from './components/product.leaf';
import { Box } from './components/box.composite';

function clientCode(order: import('./core/component.interface').OrderComponent): void {
    console.log(`Total price: $${order.getPrice()}`);
    console.log('\nOrder structure:');
    order.print();
}

// Products (leaves)
const phone = new Product('iPhone', 999);
const charger = new Product('Charger', 29);
const airpods = new Product('AirPods', 199);
const laptop = new Product('MacBook', 1999);
const mouse = new Product('Mouse', 79);
const keyboard = new Product('Keyboard', 129);

// Small box with phone accessories
const phoneBox = new Box('Phone Box');
phoneBox.add(phone);
phoneBox.add(charger);
phoneBox.add(airpods);

// Small box with laptop accessories
const laptopBox = new Box('Laptop Box');
laptopBox.add(laptop);
laptopBox.add(mouse);
laptopBox.add(keyboard);

// Main box contains two smaller boxes
const mainBox = new Box('Main Box');
mainBox.add(phoneBox);
mainBox.add(laptopBox);

console.log('--- CLIENT TREATS LEAF AND COMPOSITE THE SAME WAY ---\n');
console.log('Single product:');
clientCode(phone);

console.log('\nEntire order:');
clientCode(mainBox);
