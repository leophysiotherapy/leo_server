import sendMail from '@sendgrid/mail'

sendMail.setApiKey(process.env.SENDGRID)


export async function SendEmail(email: string, subject: string, message: string) {

    try {
        const msg = {
            to: email,
            from: "leophysiotherapyy@gmail.com", //from
            subject: subject, //What event or subject to tell to user
            html: message,
        }


        sendMail.send(msg)
    } catch (e) {
        console.error(e.message)
    }
}

export async function EmailReminder(email: string, subject: string, message: string, date: number) {
    try {
        sendMail.send({
            to: email,
            from: 'leophysiotherapyy@gmail.com',
            subject,
            html: message,
            sendAt: date
        })
    } catch (e) {
        console.error(e.message)
    }
}