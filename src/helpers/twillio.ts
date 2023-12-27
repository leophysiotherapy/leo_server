import twillio from 'twilio'

const { Twilio } = twillio
const client = new Twilio(process.env.TWILLIOACCOUNT, process.env.TWILLIOAUTH)

export const TextClient = async (clientNumber: string, date: string, time: string) => {

    try {
        await client.messages.create({
            from: '+12295305097',
            messagingServiceSid: 'MG94f2fb1aa3c0e4289d6b6bfaa9f5cea5',
            to: clientNumber,
            scheduleType: "fixed",
            sendAt: new Date(date),
            body: `Good day! You have an appointment with Leonardo's Physical Therapy Rehabilitation Clinic today at ${time}. We are anticipating seeing you!`
        })
    } catch (e) {
        console.log(e.message)
    }
}