import sendMail from '@sendgrid/mail'


sendMail.setApiKey(process.env.SENDGRID)


export async function SendEmail(email: string, message: string) {
    const msg = {
        to: email,
        from: "raminjoshua05@gmail.com", //from
        subject: "Account Verification", //What event or subject to tell to user
        html: message
    }


    sendMail.send(msg)
}

