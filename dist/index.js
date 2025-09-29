import { Gateway, GatewayIntents } from './core/index.js';
let g = new Gateway({
    token: 'token',
    intents: GatewayIntents.Guilds,
});
g.event_handler();
g.on('ready', (client) => {
    console.log(`Logged in as ${client.user.username}!`);
});
//# sourceMappingURL=index.js.map