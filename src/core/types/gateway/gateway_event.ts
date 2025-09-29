import type { Heartbeat, Identify, GatewayResume } from './index.js';

export interface GatewayEvent {
  op: number;
  d: Heartbeat | Identify | GatewayResume | number | null;
  s: number | null;
  t: string | null;
}
