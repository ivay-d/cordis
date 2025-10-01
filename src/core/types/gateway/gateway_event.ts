import type { Heartbeat, Identify, GatewayResume, RequestGuildMembers, PresenceUpdate } from './index.js';

export interface GatewayEvent {
  op: number;
  d: Heartbeat | Identify | GatewayResume | RequestGuildMembers | PresenceUpdate | number | null;
  s: number | null;
  t: string | null;
}
