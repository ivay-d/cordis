import Websocket from 'ws';
import { Logger } from '../../utils/index.js';
import { platform } from 'os';
import EventEmitter from 'events';
export class Gateway extends EventEmitter {
    ws;
    token;
    send_id;
    sent_heartbeat;
    logger;
    d_field;
    constructor(ws, token) {
        super();
        this.ws = ws;
        this.token = token;
        this.send_id = false;
        this.sent_heartbeat = false;
        this.logger = new Logger();
        this.d_field = null;
    }
    event_handler() {
        this.ws.on('message', (udata) => {
            const data = JSON.parse(udata.toString());
            switch (data.op) {
                case 10:
                    if (!this.sent_heartbeat) {
                        this.hello_world(data);
                    }
                    else {
                        this.immediately_send_heartbeat();
                    }
                    ;
                    break;
                case 11:
                    this.logger.info("Heartbeat succesful");
                    /**
                     * Heartbeat was succesful, ignore
                     */
                    break;
                case 0:
                    switch (data.s) {
                        case 1:
                            this.emit('ready', data.d);
                            this.d_field = data.s;
                            break;
                    }
                    break;
                default:
                    console.log(JSON.stringify(data));
                    this.d_field = data.s;
                    break;
            }
        });
    }
    async hello_world(data) {
        const d = data.d;
        const jitter = Math.random();
        this.logger.info(`Set jitter as: ${jitter}`);
        this.sent_heartbeat = true;
        await new Promise(resolve => setTimeout(resolve, jitter));
        setInterval(() => {
            this.immediately_send_heartbeat();
        }, d?.heartbeat_interval);
    }
    immediately_send_heartbeat() {
        const heartbeat = {
            op: 1,
            d: this.d_field,
            t: null,
            s: null
        };
        this.ws.send(Buffer.from(JSON.stringify(heartbeat)));
        this.logger.info('Sent heartbeat');
        if (!this.send_id) {
            this.identify();
            this.send_id = true;
        }
    }
    identify() {
        const data = {
            op: 2,
            d: {
                token: this.token,
                properties: {
                    os: platform(),
                    device: "cordis",
                    browser: "cordis"
                },
                intents: 0,
            },
            s: null,
            t: null,
        };
        this.ws.send(Buffer.from(JSON.stringify(data)));
        this.logger.info('Sent identify');
    }
}
//# sourceMappingURL=gateway.js.map