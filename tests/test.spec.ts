import { CfReceiverService } from "../src/cfReceiver.service"


describe('CF-Receiver tests', () => {
    it('should run demo test', done => {
        const r = new CfReceiverService({
            workflowID: '88fm'
        })

        expect(1).toBeTruthy()


        setTimeout(() => {
            done()
        }, 1000 * 10)
    })
})
