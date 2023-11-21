import twillio from 'twilio'

const { Twilio } = twillio
const client = new Twilio(process.env.TWILLIOACCOUNT, process.env.TWILLIOAUTH)

export const TextClient = async (clientNumber: string) => {
    
    await client.messages.create({
        from: '+12295305097',
        messagingServiceSid: 'MG94f2fb1aa3c0e4289d6b6bfaa9f5cea5',
        to: clientNumber,
        body: `Good day! You have an appointment with Leonardo's Physical Therapy Rehabilitation Clinic in just over an hour. We are anticipating seeing you!`
    })
}