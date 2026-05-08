import { IOrderFacade, OrderFacade } from './facade/order.facade';
import { InventoryService } from './services/inventory.service';
import { PaymentService } from './services/payment.service';
import { ShippingService } from './services/shipping.service';
import { NotificationService } from './services/notification.service';

// client depends on IOrderFacade (abstraction), not OrderFacade (concrete) — DIP
function clientCode(facade: IOrderFacade): void {
    facade.placeOrder(
        'IPHONE-15',
        999,
        'tok_visa_4242',
        '123 Main Street, New York',
        'customer@example.com'
    );
}

// concrete implementations injected from outside — DIP satisfied
const facade = new OrderFacade(
    new InventoryService(),
    new PaymentService(),
    new ShippingService(),
    new NotificationService(),
);

clientCode(facade);
