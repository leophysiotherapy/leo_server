import { Twilio } from 'twilio'
const accoundSid = process.env.TWILLIOACCOUNT
const AuthToken = process.env.TWILLIOAUTH
const ownernumber = process.env.OWNERNUMBER
const client = new Twilio(accoundSid, AuthToken)


export const TextClient = async (clientNumber: string) => {
    client.messages.create({
        to: clientNumber,
        from: ownernumber,
        body: ""
    })
}