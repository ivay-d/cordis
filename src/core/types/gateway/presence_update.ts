import type { Activity } from './index.js';

export interface PresenceUpdate {
  since?: number | null;
  activities?: Activity[] | null;
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
  afk?: boolean;
}
