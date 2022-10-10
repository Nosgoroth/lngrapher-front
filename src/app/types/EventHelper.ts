declare const window: any;



export const dispatchCustomEvent = (eventname: string, detail?: any) => {
    const evt = new CustomEvent(eventname, {
        bubbles: true,
        cancelable: false,
        detail
    });
    document.dispatchEvent(evt);
    return evt;
};



export class CustomEventHelper {

    boundRun: any;

    constructor(
        public eventname: string,
        public callback: any,
        public autounbind?: boolean
    ) {

        this.boundRun = this.run.bind(this);

        this.bind();
    }

    bind() {
        document.addEventListener(this.eventname, this.boundRun);
    }

    unbind() {
        document.removeEventListener(this.eventname, this.boundRun);
    }

    run(event: any) {
        this.callback(event);
        if (this.autounbind) {
            this.unbind();
        }
    }

}

export const runOnceOnCustomEvent = (eventname: string, callback: any) => new CustomEventHelper(eventname, callback, true);

export const runAlwaysOnCustomEvent = (eventname: string, callback: any) => new CustomEventHelper(eventname, callback, false);







