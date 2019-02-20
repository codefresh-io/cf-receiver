import { Observable } from 'rxjs'


import { Config } from './interfaces/config.interface'


export class CfReceiverService {
    delayRetry
    ws: WebSocket
    config: Config
    dontRetry = false


    constructor(
        config: Config
    ) {
        this.config = config
        console.log('starting CfReceiverService')

        this.setDefaultConfig()
    }


    /**
     * open connection to the WebSocket end point
     */
    watch() {
        return new Observable(obser => {
            console.log(`watch for data from  ${this.config.endPoint}/${this.config.workflowID}`)

            this.connect(obser)
        })
    }


    close() {
        this.dontRetry = true
        this.ws.close()
    }



    connect(obser) {
        this.log('connecting to WebSocket')

        this.ws = new WebSocket(`${this.config.endPoint}/${this.config.workflowID}`)


        this.ws.onopen = () => {
            obser.next({
                type: 'start'
            })
        }


        this.ws.onerror = (event: any) => {
            obser.next({
                type: 'error',
                event
            })


            this.retry(obser)
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


    private retry(obser) {
        if (this.dontRetry) {
            this.dontRetry = false
            return
        }

        clearTimeout(this.delayRetry)


        this.delayRetry = setTimeout(() => {
            this.log('try to reconnect to WebSocket')
            this.connect(obser)
        }, this.config.reconnectDelay)
    }


    private setDefaultConfig() {
        if (!this.config.debug) this.config.debug = true
        if (!this.config.endPoint) throw 'Error -> Missing endPoint value'
        if (!this.config.workflowID) throw 'Error -> Missing workflowID value'

        if (!this.config.reconnectDelay) this.config.reconnectDelay = 5000
    }


    private log(message: string) {
        if (!this.config.debug) return

        console.log(message)
    }
}
