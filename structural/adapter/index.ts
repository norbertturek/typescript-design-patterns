import { Logger } from './core/logger.interface';
import { LegacyLoggerService } from './legacy/legacy-logger.service';
import { LegacyLoggerAdapter } from './adapters/legacy-logger.adapter';

// Application code that depends only on Logger interface — knows nothing about LegacyLoggerService
function processOrder(logger: Logger, orderId: string): void {
    logger.log(`Processing order ${orderId}...`);
    logger.warn(`Order ${orderId} has low stock items`);
    logger.error(`Order ${orderId} payment failed`);
}

console.log('--- WITHOUT ADAPTER (incompatible) ---');
// LegacyLoggerService does not implement Logger — cannot pass it directly
// processOrder(new LegacyLoggerService(), '123'); // ← TypeScript error

console.log('\n--- WITH ADAPTER ---');
const legacyService = new LegacyLoggerService();
const adapter = new LegacyLoggerAdapter(legacyService);
processOrder(adapter, '123'); // adapter implements Logger — works transparently
