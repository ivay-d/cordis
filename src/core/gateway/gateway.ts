/** Requests */
import Websocket from 'ws';

/** Types */
import type { GatewayEvent, Heartbeat, ClientConfig, GatewayIntents, GatewayUrl } from '../types/index.js';

/** Utils */
import { Endpoints } from '../types/index.js';
import { Logger } from '../../utils/index.js';
import { platform } from 'os';

/** Event */
import EventEmitter from 'events';

/**
 * Internal
 * Does the heavy lifting for gateway
 * Sends heartbeats, identify etc.
 */
export class Gateway extends EventEmitter {
  /** The websocket connection */
  ws: Websocket;


  /** The clients token */
  token: string;
  /** The intents the client is going to have */
  intents: number


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
  constructor(config: ClientConfig) {
    super();

    this.ws = new Websocket('wss://gateway.discord.gg/?v=10&encoding=json');

    this.token = config.token;
    this.intents = config.intents as number ?? 0;

    this.send_id = false;
    this.sent_heartbeat = false;

    this.interval_id = null;

    this.d_field = null;

    this.resume_gateway_url = null;
    this.session_id = null;

    this.logger = new Logger();
  }

  /**
   * Handles gateway events
   * Handles reconnetting
   */
  event_handler() {
    /** Normal gateway events */
    this.ws.on('message', (udata: GatewayEvent) => {
      const data = JSON.parse(udata.toString());

      switch(data.op) {
        case 10:
          /**
           * Check if we sent a heartbeat already
           * If not start heartbeat
           * If yes send heartbeat one time
           */
          if (!this.sent_heartbeat) {
            this.hello_world(data);
          } else {
            this.immediately_send_heartbeat();
          };
          break;
        
          /**
           * Heartbeat was succesful, ignore
           */
          case 11:
            this.logger.info("Heartbeat succesful")
            break;

        /** Reconnecting */
        case 7:
          this.logger.info(`Attemping to reconnect op: 7`);
          this.reconnect();
          break;

        /**
         * Reconnect or exit the process
         */
        case 9:
          if (data.d) {
            this.logger.info('Attempting to reconnect. op: 9, d: true');
            this.reconnect();
          } else {
            this.logger.info('Can\'t reconnect :( op: 9, d: false');
            process.exit();
          };
          break;

        /** The in-app events */
        case 0:
          switch (data.s) {
            /** Bot is online */
            case 1:
              /** For reconnecting */
              this.resume_gateway_url = data.d.resume_gateway_url + '/?v=10&encoding=json';
              
              this.session_id = data.d.session_id;
              /** For heartbeats */
              this.d_field = data.s;
              /** Emit the ready event */
              this.emit('ready', data.d);
              break;

            default:
              /** Unimplemented events */
              console.log(JSON.stringify(data));
              this.d_field = data.s;
              break;
          }
          break;
        
        default:
          /** Unimplemented events */
          console.log(JSON.stringify(data));
          this.d_field = data.s;
          break;
      }
    });

    /**
     * Something went wrong!
     * Try to reconnect
     */
    this.ws.on('close', (code: number, reason: Buffer) => {
      switch (code) {
        case 4000:
        case 4001:
        case 4002:
        case 4003:
        case 4005:
        case 4007:
        case 4008:
        case 4009:
          this.logger.info(`Attempting to reconnect. Code: ${code}, ${reason}`);
          this.reconnect();
          break;
        
        case 4004:
        case 4010:
        case 4011:
        case 4012:
        case 4013:
        case 4014:
          this.logger.info(`Cannot reconnect :( Code: ${code}, ${reason}`);
          process.exit();
          break;

        default:
          this.logger.info(`Attempting to reconnect. Code: ${code}, ${reason}`);
          this.reconnect();
          break;
      }
    })
  }

  /** Sends heartbeats on the given heartbeat */
  async hello_world(data: GatewayEvent) {
    const d = data.d as Heartbeat;

    const jitter = Math.random();
    this.logger.info(`Set jitter as: ${jitter}`);

    this.sent_heartbeat = true;
    await new Promise(resolve => setTimeout(resolve, d.heartbeat_interval * jitter));
    /** Send heartbeat one time after waiting */
    this.immediately_send_heartbeat();
    
    /** Start heartbeating regularly */
    this.interval_id = setInterval(() => {
      this.immediately_send_heartbeat();
    }, d.heartbeat_interval);
  }

  /** Sends one heartbeat immediately */
  immediately_send_heartbeat() {
    const heartbeat: GatewayEvent = {
      op: 1,
      d: this.d_field,
      t: null,
      s: null
    };

    /** Send heartbeat */
    this.ws.send(Buffer.from(JSON.stringify(heartbeat)));
    this.logger.info('Sent heartbeat');

    /**
     * Check if identify was sent
     * If not send it
     */
    if (!this.send_id) {
      this.identify();
      this.send_id = true;
    }
  }

  /** Sends the identify payload */
  identify() {
    const data: GatewayEvent = {
      op: 2,
      d: {
        token: this.token,
        properties: {
          os: platform(),
          device: "cordis",
          browser: "cordis"
        },
        intents: this.intents,
      },
      s: null,
      t: null,
    }

    /** Send identify */
    this.ws.send(Buffer.from(JSON.stringify(data)));
    this.logger.info('Sent identify');
  }

  /** Reconnect to the Discord API gateway */
  reconnect() {
    /**
     * Close the current connection
     * TODO: Fix this giving error (I really don't know how)
     */
    this.ws.close();
    /** Make a new connection */
    this.ws = new Websocket(this.resume_gateway_url as string);

    this.sent_heartbeat = false;
    /** We sent an "identify" here */
    const json: GatewayEvent = {
      op: 6,
      d: {
        token: this.token,
        session_id: this.session_id as string,
        seq: this.d_field as number,
      },
      s: null,
      t: null,
    }

    /**
     * Send "identify"
     * Start handling events
     */
    this.ws.on('open', () => {
      this.ws.send(JSON.stringify(json));
      this.logger.info('Reconnected!')
      this.event_handler();
    });

    this.ws.on('error', (e) => {
      console.log(e);
    })
  }
}