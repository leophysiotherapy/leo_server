import sendMail from '@sendgrid/mail'

sendMail.setApiKey(process.env.SENDGRID)


export async function SendEmail(email: string, subject: string, message: string) {

    const msg = {
        to: email,
        from: "leophysiotherapyy@gmail.com", //from
        subject: subject, //What event or subject to tell to user
        html: message,
    }


    sendMail.send(msg)
}

export async function EmailReminder(email: string, subject: string, message: string, date: number) {
    sendMail.send({
        to: email,
        from: 'leophysiotherappy@gmail.com',
        subject,
        html: message,
        sendAt: date
    })
}