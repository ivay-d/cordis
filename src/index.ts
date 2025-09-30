import { Gateway, GatewayIntents } from './core/index.js';

let g = new Gateway({
    token: '',
});
g.event_handler();

g.on('ready', (client) => {
    console.log(`Logged in as ${client.user.username}!`)
})
