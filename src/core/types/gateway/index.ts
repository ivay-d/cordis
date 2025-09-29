import type {
  Activity,
  ActivityTimestamps,
  ActivityEmoji,
  ActivityParty,
  ActivityAssets,
  ActivitySecrets,
  ActivityButtons,
} from './activity';
import type {
  Identify, 
  IdentifyConnectionProperties
} from './identify';
import type { GatewayEvent } from './gateway_event.js';
import type { GatewayResume } from './gateway_resume.js';
import type { Heartbeat } from './heartbeat.js';
import type { PresenceUpdate } from './presence_update.js';

export type {
  Activity,
  ActivityTimestamps,
  ActivityEmoji,
  ActivityParty,
  ActivityAssets,
  ActivitySecrets,
  ActivityButtons,
  Identify,
  IdentifyConnectionProperties,
  GatewayEvent,
  GatewayResume,
  Heartbeat,
  PresenceUpdate,
};

export { GatewayIntents } from './intents.js';