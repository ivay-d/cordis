import type { IdentifyConnectionProperties, PresenceUpdate } from '@types';

export interface Identify {
  token: string;
  properties: IdentifyConnectionProperties;
  compress?: boolean;
  large_threshold?: number;
  shard?: number[];
  presence?: PresenceUpdate;
  intents: number;
}
