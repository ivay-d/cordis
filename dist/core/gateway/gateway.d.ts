/** Requests */
import Websocket from 'ws';
/** Types */
import type { GatewayEvent, ClientConfig } from '../types/index.js';
import { Logger } from '../../utils/index.js';
/** Event */
import EventEmitter from 'events';
/**
 * Internal
 * Does the heavy lifting for gateway
 * Sends heartbeats, identify etc.
 */
export declare class Gateway extends EventEmitter {
    /** The websocket connection */
    ws: Websocket;
    /** The clients token */
    token: string;
    /** The intents the client is going to have */
    intents: number;
    /** Should we send the identify payload? */
    send_id: boolean;
    /** Have we sent the first heartbeat? */
    sent_heartbeat: boolean;
    /** The heartbeat interval id */
    interval_id: NodeJS.Timeout | null;
    /** The d field we must send on the heartbeat */
    d_field: number | null;
    /** The gateway url we are going to use when reconnectting */
    resume_gateway_url: string | null;
    /** The session id */
    session_id: string | null;
    /** Logger for debugging */
    logger: Logger;
    /** Sets the variables value */
    constructor(config: ClientConfig);
    /**
     * Handles gateway events
     * Handles reconnetting
     */
    event_handler(): void;
    /** Sends heartbeats on the given heartbeat */
    hello_world(data: GatewayEvent): Promise<void>;
    /** Sends one heartbeat immediately */
    immediately_send_heartbeat(): void;
    /** Sends the identify payload */
    identify(): void;
    /** Reconnect to the Discord API gateway */
    reconnect(): void;
}
//# sourceMappingURL=gateway.d.ts.map