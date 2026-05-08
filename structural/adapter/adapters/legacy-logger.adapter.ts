import { Logger } from '../core/logger.interface';
import { LegacyLoggerService } from '../legacy/legacy-logger.service';

export class LegacyLoggerAdapter implements Logger {
    constructor(private legacyLogger: LegacyLoggerService) {}

    log(message: string): void {
        this.legacyLogger.writeInfo(message);
    }

    warn(message: string): void {
        this.legacyLogger.writeWarning(message);
    }

    error(message: string): void {
        this.legacyLogger.writeCritical(message);
    }
}
