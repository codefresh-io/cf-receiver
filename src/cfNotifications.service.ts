import { Observable } from 'rxjs'
import { w3cwebsocket as WebSocket } from 'websocket'

import { NotificationsConfig } from './interfaces/notificationsConfig.interface'

export class CfNotificationsService {
    delayRetry
    private ws: WebSocket
    config: NotificationsConfig
    dontRetry = false


    constructor(
        config: NotificationsConfig
    ) {
        this.config = config
        console.log('starting CfNotificationsService')

        this.setDefaultConfig()
    }


    /**
     * open connection to the WebSocket end point
     */
    watch() {
        return new Observable(obser => {
            console.log(`watch for data from  ${this.config.endPoint}/notifications`)

            this.connect(obser)
        })
    }


    close() {
        this.dontRetry = true
        this.ws.close()
    }


    send(data) {
        this.ws.send(data)
    }



    connect(obser) {
        this.log('connecting to WebSocket')

        this.ws = new WebSocket(`${this.config.endPoint}`)

        // will run when the user will unsubscribe
        obser.add(() => {
            this.close()
        })


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

        if (!this.config.reconnectDelay) this.config.reconnectDelay = 5000
    }


    private log(message: string) {
        if (!this.config.debug) return

        console.log(message)
    }
}
