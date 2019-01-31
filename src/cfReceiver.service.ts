import { Observable } from 'rxjs'


import { Config } from './interfaces/config.interface'


export class CfReceiverService {
    ws: WebSocket
    config: Config


    constructor(
        config: Config
    ) {
        this.config = config
        console.log('starting CfReceiverService')
    }


    /**
     * open connection to the WebSocket end point
     */
    watch() {
        return new Observable(obser => {
            console.log(`watch for data from  ws://${this.config.endPoint}/${this.config.workflowID}`)

            this.connect(obser)
        })
    }



    connect(obser) {
        console.log('connecting to WebSocket')

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


            this.retry(obser)
        }


        this.ws.onmessage = (event: any) => {
            obser.next({
                type: 'message',
                event
            })
        }
    }


    retry(obser) {
        console.log('try to reconnect to WebSocket')


        setTimeout(() => {
            this.connect(obser)
        }, this.config.reconnectDelay)
    }
}
