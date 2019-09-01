import winston from 'winston';

class Console {
    private level: number;

    constructor() {
        this.level = 0;
    }

    public log(str: string): void {
        console.log(str)
    }

    public info(str: string): void {
        console.info(str);
    }

    public warn(str: string): void {
        console.warn(str);
    }

    public error(str: string): void {
        console.error(str);
    }
}

let logger: Console = new Console();

export default logger;