import { extendType, nonNull, stringArg } from "nexus";
import { TextClient } from "../../../helpers/twillio.js";
import { SendEmail } from "../../../helpers/sendgrid.js";




export const SMSMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSMSNotification", {
            type: "Boolean",
            args: { phoneNumber: nonNull("PhoneNumber") },
            resolve: async (_, { phoneNumber }): Promise<boolean> => {
                TextClient(phoneNumber)
                return true
            }
        })
        t.field("createEmailNotification", {
            type: "Boolean",
            args: { email: nonNull("EmailAddress") },
            resolve: async (_, { email }): Promise<any> => {
                 SendEmail(`${email}`, "Appointment", `<html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="/index.css" rel="stylesheet" />
                
                <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    <table style="width: 500px; border: 1px solid #ccc">
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                            </td>
                        </tr>
                        <tr style="height: 65px;">
                            <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                            </td>
                        </tr>
                        <tr style="height: 65px;">
                            <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                ready to attend to your patient at the scheduled time.
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                patients.
                            </td>
                        </tr>
                        <tr style=" height: 40px;">
                            <td style="font-family: Poppins;">
                                Best regards,
                            </td>
                        </tr>
                
                        <tr style="height: 0;">
                
                            <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                        </tr>
                    </table>
                </body>
                
                </html>`)
                return true;
            }
        })
    },

})