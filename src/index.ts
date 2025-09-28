import { Gateway } from './core/index.js';
import WebSocket from 'ws';

let ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')
let g = new Gateway(ws, 'token');
g.event_handler();

g.on('ready', (client) => {
    console.log(`Logged in as ${client.user.username}!`)
})
