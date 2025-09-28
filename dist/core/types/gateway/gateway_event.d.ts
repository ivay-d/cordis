import type { Heartbeat, Identify, GatewayResume } from '@types';
export interface GatewayEvent {
    op: number;
    d: Heartbeat | Identify | GatewayResume | number | null;
    s: number | null;
    t: string | null;
}
//# sourceMappingURL=gateway_event.d.ts.map