import type { Heartbeat, Identify } from '@types';

export interface GatewayEvent {
  op: number;
  d: Heartbeat | Identify | number | null;
  s: number | null;
  t: string | null;
}
