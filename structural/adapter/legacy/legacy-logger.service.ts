// Simulates an external/legacy service we cannot modify.
// Completely different interface from our Logger.
export class LegacyLoggerService {
    writeInfo(msg: string): void {
        console.log(`[LEGACY INFO] ${msg}`);
    }

    writeWarning(msg: string): void {
        console.log(`[LEGACY WARN] ${msg}`);
    }

    writeCritical(msg: string): void {
        console.log(`[LEGACY CRITICAL] ${msg}`);
    }
}
