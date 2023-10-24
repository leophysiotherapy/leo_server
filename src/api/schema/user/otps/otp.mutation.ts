import { extendType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";
import generateOTP from "../../../../helpers/generateRandom.js";
import { SendEmail } from "../../../../helpers/sendgrid.js";
import { GraphQLError } from "graphql";

export const OTPMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createOTP", {
            type: "OTP",
            args: { email: nonNull("EmailAddress"), },
            resolve: async (_, { email }): Promise<any> => {
                const dates = new Date();


                const profile = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        profile: true
                    }
                })

                const otps = await prisma.otp.create({
                    data: {
                        otp: await generateOTP(8),
                        expiredAt: new Date(dates.getTime() + 3 * 60000),
                        createdAt: new Date(Date.now()),
                        user: {
                            connect: {
                                email
                            }
                        }
                    }
                })


                SendEmail(email, `Reset Password OTP`, `
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="/index.css" rel="stylesheet" />
                
                <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    <table style="width: 500px; border: 1px solid #ccc">
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">Dear ${profile.profile.lastname}, ${profile.profile.firstname}</h2>
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">Your One-Time Password (OTP) for secure access is: ${otps.otp}.
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">Please do not share this OTP with anyone, as it is valid for a single use
                                only.
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">If you did not request this OTP, please ignore this message.
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
                
                </html>
             `)

                return otps
            }
        })


        t.field("verifyOTP", {
            type: "OTP",
            args: { otp: nonNull(stringArg()) },
            resolve: async (_, { otp }): Promise<any> => {
                const ottps = await prisma.otp.findUnique({
                    where: {
                        otp
                    }
                })
                if (!ottps) throw new GraphQLError("OTP Mismatched")
                if (ottps.expiredAt.getTime() < new Date().getTime()) {
                    throw new GraphQLError("Your OTP is expired create a new one")
                }
                return ottps
            }
        })
    },
})