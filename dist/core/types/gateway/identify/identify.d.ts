import type { IdentifyConnectionProperties, PresenceUpdate } from '../index.js';
export interface Identify {
    token: string;
    properties: IdentifyConnectionProperties;
    compress?: boolean;
    large_threshold?: number;
    shard?: number[];
    presence?: PresenceUpdate | null;
    intents: number;
}
//# sourceMappingURL=identify.d.ts.map