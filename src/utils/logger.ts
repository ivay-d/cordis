export class Logger {

    /**
     * Logs unimportant things
     * Mostly for debugging
     */
    info(text: string) {
        const d = new Date();
        console.info(`\x1b[38;2;255;165;0mInfo ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}\x1b[0m | ${text}`);
    }
}