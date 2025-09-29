import type { Activity } from './index.js';

export interface PresenceUpdate {
  since: number;
  activities: Activity[];
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
  afk: boolean;
}
