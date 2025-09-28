import type { Activity } from '@types';

export interface PresenceUpdate {
  since: number;
  activities: Activity[];
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
  afk: boolean;
}
