import type {
  ActivityTimestamps,
  ActivityEmoji,
  ActivityParty,
  ActivityAssets,
  ActivitySecrets,
  ActivityButtons,
} from '@types';

export interface Activity {
  name: string;
  type: 0 | 1;
  url?: string | null;
  created_at: number;
  timestamps: ActivityTimestamps;
  application_id?: number;
  status_display_type?: 0 | 1 | 2 | null;
  details?: string | null;
  details_url?: string | null;
  state?: string | null;
  state_url?: string | null;
  emoji?: ActivityEmoji | null;
  party?: ActivityParty;
  assets?: ActivityAssets;
  secrets?: ActivitySecrets;
  instance?: boolean;
  flags?: number;
  buttons?: ActivityButtons[];
}
