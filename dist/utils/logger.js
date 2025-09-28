export class Logger {
    info(text) {
        const d = new Date();
        console.info(`\x1b[38;2;255;165;0mInfo ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}\x1b[0m | ${text}`);
    }
}
//# sourceMappingURL=logger.js.map