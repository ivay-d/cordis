import Websocket from 'ws';
import type { GatewayEvent } from '@types';
import { Logger } from '../../utils/index.js';
import EventEmitter from 'events';
export declare class Gateway extends EventEmitter {
    ws: Websocket;
    token: string;
    send_id: boolean;
    sent_heartbeat: boolean;
    logger: Logger;
    d_field: number | null;
    constructor(ws: Websocket, token: string);
    event_handler(): void;
    hello_world(data: GatewayEvent): Promise<void>;
    immediately_send_heartbeat(): void;
    identify(): void;
}
//# sourceMappingURL=gateway.d.ts.map