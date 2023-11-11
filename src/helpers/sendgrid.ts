import sendMail from '@sendgrid/mail'



const { send, setApiKey } = sendMail




export async function SendEmail(email: string, subject: string, message: string) {
    setApiKey(process.env.SENDGRID)
    const msg = {
        to: email,
        from: "leophysiotherapyy@gmail.com", //from
        subject: subject, //What event or subject to tell to user
        html: message
    }


    send(msg)
}

