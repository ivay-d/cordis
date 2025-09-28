/** Requests */
import Websocket from 'ws';
/** Types */
import type { GatewayEvent } from '@types';
/** Utils */
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
    /** Should we send the identify payload? */
    send_id: boolean;
    /** Have we sent the first heartbeat? */
    sent_heartbeat: boolean;
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
    constructor(ws: Websocket, token: string);
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
    reconnect(): void;
}
//# sourceMappingURL=gateway.d.ts.map