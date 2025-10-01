import { Gateway, GatewayIntents } from './core/index.js';

let g = new Gateway({
    token: '',
    presence: {
        status: 'idle',
        activities: [
            {
                'name': 'Lying on my bed staring into the blue',
                'type': 0,
            }
        ]
    }
});

g.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.username}!`);
    await new Promise(resolve => setTimeout(resolve, 10000));
    g.update_presence({
        status: 'online',
    })
})
