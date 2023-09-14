import { extendType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";
import generateOTP from "../../../../helpers/generateRandom.js";
import { SendEmail } from "../../../../helpers/sendgrid.js";
import { GraphQLError } from "graphql";

export const OTPMutation = extendType({
    type: "OTP",
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


                SendEmail(email, `
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link href="/index.css" rel="stylesheet" />
                    <style>
                        body {
                            width: 100%;
                            height: 100vh;
                            box-sizing: border-box;
                            padding: 0;
                            margin: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                
                        body div {
                            height: 500px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            gap: 10px;
                        }
                
                        body div h2 {
                            width: 100%;
                            height: auto;
                            text-align: left;
                        }
                
                        body div span {
                            width: 100%;
                            text-align: left;
                            height: auto;
                            font-size: 18px;
                        }
                
                        body div .btn {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 70px;
                        }
                
                        body div a {
                            height: 50px;
                            width: 150px;
                            text-align: center;
                            background-color: rgb(0, 162, 255);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-decoration: none;
                            color: #fff;
                        }
                    </style>
                </head>
                
                
                <body>
                    <div>
                        <h2>Dear ${profile.profile.lastname},${profile.profile.firstname}</h2>
                
                        <span>
                            Your One-Time Password (OTP) for secure access is: ${otps.otp}.
                        </span>
                
                        <span>
                            Please do not share this OTP with anyone, as it is valid for a single use only.
                        </span>
                        <span>
                            If you did not request this OTP, please ignore this message.
                        </span>
                        <br />
                        <span>
                            Thank you,
                        </span>
                        <br />
                        <span>Restore Rehabilitation Group</span>
                    </div>
                </body>
                
                </html>`)

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