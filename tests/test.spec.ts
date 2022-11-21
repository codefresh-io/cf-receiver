import { CfReceiverService } from "../src/cfReceiver.service"
import { CfNotificationsService } from "../src/cfNotifications.service"


describe('CF-Receiver tests', () => {
    it('should run demo test for CfReceiverService', () => {
        const r = new CfReceiverService({
            endPoint: 'example',
            workflowID: '88fm',
            debug: false,
            reconnectDelay: 1000
        })
        expect(r).toBeTruthy()
        expect(r.config.endPoint).toBe('example')
    })


    it('should run demo test for CfNotificationsService ', () => {
        const r = new CfNotificationsService({
            endPointBuilder: () => 'example',
            debug: false,
            reconnectDelay: 1000
        })
        expect(r).toBeTruthy()
        expect(r.config.endPointBuilder()).toBe('example')
    })

    it('should run demo test for CfNotificationsService with missing config', () => {
        expect(function () {
            new CfNotificationsService({
              endPointBuilder: () => '',
              debug: false,
              reconnectDelay: 1000,
            });
          }).toThrow("Error -> Missing endPoint value")
    })

    it('should run demo test for CfNotificationsService with wrong config type', () => {
        expect(function () {
            new CfNotificationsService({
              endPointBuilder: 'example' as any,
              debug: false,
              reconnectDelay: 1000,
            });
          }).toThrow("Error -> Missing endPoint value")
    })
})
