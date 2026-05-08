import { IProductService } from './core/product-service.interface';
import { ProductService } from './services/product.service';
import { CachingProxy } from './proxies/caching.proxy';
import { ProtectionProxy } from './proxies/protection.proxy';

function clientCode(service: IProductService): void {
    service.getProduct('IPHONE-15');
    service.getProduct('IPHONE-15');
    service.getProduct('MACBOOK-PRO');
}

const realService = new ProductService();

console.log('=== Caching Proxy ===');
const cachingProxy = new CachingProxy(realService);
clientCode(cachingProxy);

console.log('\n=== Protection Proxy — admin ===');
const adminProxy = new ProtectionProxy(realService, 'admin');
adminProxy.getProduct('IPHONE-15');

console.log('\n=== Protection Proxy — guest ===');
const guestProxy = new ProtectionProxy(realService, 'guest');
guestProxy.getProduct('IPHONE-15');
