import type { PresenceUpdate } from "../gateway";

export interface ClientConfig {
    token: string;
    intents?: number | null;
    large_threshold?: number | null;
    presence?: PresenceUpdate | null;
}