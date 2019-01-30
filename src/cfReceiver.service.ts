import { Observable } from 'rxjs'


import { Config } from './interfaces/config.interface'


export class CfReceiverService {
    ws: WebSocket
    config: Config


    constructor(config: Config) {
        this.config = config
        console.log('starting CfReceiverService')
    }

    /**
     * open connection to the WebSocket end point
     */
    init() {
        return new Observable(obser => {
            this.ws = new WebSocket(`ws://${this.config.endPoint}/${this.config.workflowID}`)


            this.ws.onerror = (event: any) => {
                obser.next({
                    type: 'error',
                    event
                })
            }


            this.ws.onclose = (event: any) => {
                obser.next({
                    type: 'close',
                    event
                })
            }


            this.ws.onmessage = (event: any) => {
                obser.next({
                    type: 'message',
                    event
                })
            }
        })
    }
}
