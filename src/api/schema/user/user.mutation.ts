import { enumType, extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma, pubsub } from "../../../util/index.js";
import { GraphQLError } from 'graphql'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from "jsonwebtoken";
import { SendEmail } from "../../../helpers/sendgrid.js";
import { ImageUpload } from "../../../helpers/aws.js";
import PhoneCheck from "../../../helpers/phoneChecker.js";


const { sign } = jsonwebtoken

export const userRoles = enumType({
    name: "roles",
    members: [ "admin", "staff", "patient" ]
})


export const UserInput = inputObjectType({
    name: "userInput",
    definition(t) {
        t.email("email");
        t.string("password");
        t.string("firstname");
        t.string("lastname");
        t.string("phone");
        t.nullable.string("designation");
        t.nullable.string("expertise");
        t.nullable.phone("emergencyPhone");
    },
})

export const UserMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field('createAdminAccount', {
            type: "user",
            args: { user: "userInput" },
            resolve: async (_, { user: { email, firstname, lastname, phone, password, designation, emergencyPhone, expertise } }): Promise<any> => {
                const pass = await bcryptjs.hash(password, 12);
                return await prisma.user.create({
                    data: {
                        email, password: pass,
                        role: "admin",
                        verified: true,
                        profile: {
                            create: {
                                firstname,
                                lastname,
                                phone,
                                designation,
                                expertise,
                                emergencyPhone
                            }
                        }

                    }
                })
            }
        })
        t.field("createStaffAccount", {
            type: "user",
            args: { user: "userInput", file: "Upload" },
            resolve: async (_, { user: { email, firstname, lastname, phone, designation, emergencyPhone, expertise }, file }): Promise<any> => {

                const pass = await bcryptjs.hash("0000", 12);
                if (file) {

                    const { createReadStream, filename } = await file;
                    const users = await prisma.user.create({
                        data: {
                            email, password: pass,
                            role: "staff",
                            verified: true,
                            profile: {
                                create: {
                                    firstname,
                                    lastname,
                                    phone,
                                    designation,
                                    expertise,
                                    emergencyPhone,
                                    avatar: {
                                        create: {
                                            avatar: await ImageUpload(filename, createReadStream)
                                        }
                                    }
                                }
                            }

                        }
                    })

                    pubsub.publish("createUserAccount", users)

                    return users
                } else {
                    const users = await prisma.user.create({
                        data: {
                            email, password: pass,
                            role: "staff",
                            verified: true,
                            profile: {
                                create: {
                                    firstname,
                                    lastname,
                                    phone,
                                    designation,
                                    expertise,
                                    emergencyPhone,
                                }
                            }

                        }
                    })

                    pubsub.publish("createUserAccount", users)

                    return users
                }
            }

        })
        t.field("createPatientAccount", {
            type: "user",
            args: { user: "userInput" },
            resolve: async (_, { user: { email, firstname, lastname, phone, password, } }): Promise<any> => {
                const pass = await bcryptjs.hash(password, 12);

                const pattern = /^[a-zA-Z0-9._]+@gmail\.com$/;

                if (!pattern.test(email)) throw new GraphQLError("Please enter your GMAIL Address")

                if (PhoneCheck(phone)) {
                    await SendEmail(email, 'Account Verification', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />
                    
                        <title>Account Verification</title>
                    
                        <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                            <table style="width: 500px; border: 1px solid #ccc">
                                <tr style="height: 60px;">
                                    <td style="font-family: Poppins;"> Hello ${lastname}, ${firstname}</h2>
                                    </td>
                                </tr>
                                <tr style="height: 60px;">
                                    <td style="font-family: Poppins;"> Welcome to the Leonardo Physical Therapy Rehabilitation Clinic!</td>
                                </tr>
                                <tr style=" height: 60px;">
                                    <td style="font-family: Poppins;">
                                        Before accessing your account, you must verify your email by
                                        clicking
                                        the button or link.
                                    </td>
                                </tr>
                                <tr style=" height: 60px;">
                                    <td sstyle="font-family: Poppins;">
                                        By activating your account, you can access the features that are necessary to continue on
                                        the
                                        website.
                                    </td>
                                </tr>
                                <tr style="height: 60px;">
                                    <td style="font-family: Poppins;">
                                        Thank you
                                    </td>
                                </tr>
                        
                                <tr style=" height: 60px;">
                                    <td style=" width: 100%; font-family: Poppins; text-align: center;">
                        
                                        <a style="text-align: center; background-color: rgb(0, 162, 255); text-align: center; text-decoration: none; color: #fff;  padding: 10px 20px;"
                                            href="http://localhost:3000/verify/confirmed">Click this</a>
                                    </td>
                                </tr>
                                <tr style="height: 60px;">
                        
                                    <td style="font-family: Poppins;">Leonardo Physical Therapy Rehabilitation</td>
                                </tr>
                            </table>
                        </body>
                    
                    </html>`)


                    const checkEmail = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    })

                    if (checkEmail.email === email) throw new GraphQLError("Email already used");

                    return await prisma.user.create({
                        data: {
                            email, password: pass,
                            role: "patient",
                            profile: {
                                create: {
                                    firstname,
                                    lastname,
                                    phone,
                                }
                            },

                            diagnosis: {
                                create: {
                                    diagnosis: ""
                                }
                            }
                        }
                    })
                } else {
                    throw new GraphQLError("Phone number is not valid of the form +17895551234 (7-15 digits)")
                }




            }
        })
        t.field("updateStaffAccount", {
            type: "user",
            args: { userID: nonNull(idArg()), user: "userInput", file: "Upload" },
            resolve: async (_, { userID, user: { firstname, lastname, phone, designation, expertise, emergencyPhone }, file }): Promise<any> => {
                if (file) {
                    const { createReadStream, filename } = await file
                    return await prisma.user.update({
                        where: { userID },
                        data: {
                            profile: {
                                update: {
                                    expertise,
                                    emergencyPhone, designation,
                                    firstname,
                                    lastname,
                                    phone,
                                    avatar: {
                                        upsert: {
                                            create: {
                                                avatar: await ImageUpload(filename, createReadStream)
                                            },
                                            update: {
                                                avatar: await ImageUpload(filename, createReadStream)
                                            }
                                        }
                                    }
                                },

                            },
                        }
                    })
                } else {
                    return await prisma.user.update({
                        where: { userID },
                        data: {
                            profile: {
                                update: {
                                    expertise,
                                    emergencyPhone, designation,
                                    firstname,
                                    lastname,
                                    phone,
                                },

                            },
                        }
                    })
                }
            }
        })
        t.field("createOldPatient", {
            type: "user",
            args: { user: "userInput", diagnosis: nonNull(stringArg()), prescription: nonNull(stringArg()), time: stringArg(), date: nonNull(stringArg()), platform: "platform" },
            resolve: async (_, { user: { email, phone, firstname, lastname }, diagnosis, prescription, time, date, platform }): Promise<any> => {
                return await prisma.user.create({
                    data: {
                        email,
                        password: await bcryptjs.hash("0000", 12),
                        verified: true,
                        role: "patient",
                        profile: {
                            create: {
                                firstname, lastname, phone
                            },
                        },
                        appointment: {
                            create: {
                                amount: 175,
                                date: new Date(date), platform, time,
                                status: "finished",
                            }
                        },
                        diagnosis: {
                            create: {
                                diagnosis
                            }
                        },
                        prescription: {
                            create: {
                                prescription
                            }
                        }
                    }
                })
            }
        })
        t.field("updateOlPatient", {
            type: "user",
            args: { userID: nonNull(idArg()), user: "userInput", diagnosis: nonNull(stringArg()), prescription: nonNull(stringArg()), time: stringArg(), date: nonNull(stringArg()), platform: "platform" },
            resolve: async (_, { userID, user: { email, phone, firstname, lastname }, diagnosis, prescription, time, date, platform }): Promise<any> => {

                const userPrescriptions = await prisma.presciption.findMany({
                    where: {
                        userID
                    }
                })

                const userDiagnosis = await prisma.diagnosis.findMany({
                    where: {
                        userID
                    }
                })
                return await prisma.user.update({
                    data: {
                        email,
                        profile: {
                            update: {
                                firstname, lastname, phone,
                            }

                        },
                        appointment: {
                            create: {
                                amount: 175,
                                date: new Date(date), platform, time,
                                status: "finished",
                            }
                        },
                        prescription: {
                            upsert: {
                                create: {
                                    prescription
                                },
                                update: {
                                    prescription
                                },
                                where: {
                                    prescriptionID: userPrescriptions[ 0 ].prescriptionID
                                }
                            }
                        },
                        diagnosis: {
                            upsert: {
                                create: {
                                    diagnosis
                                },
                                update: {
                                    diagnosis
                                },
                                where: {
                                    diagnosisID: userDiagnosis[ 0 ].diagnosisID
                                }
                            }
                        }
                    },
                    where: {
                        userID
                    }
                })
            }
        })


        t.field("updatePatientAccount", {
            type: "user",
            args: { userID: nonNull(idArg()), firstname: nonNull(idArg()), lastname: nonNull(stringArg()), phone: nonNull("PhoneNumber") },
            resolve: async (_, { userID, firstname, lastname, phone }): Promise<any> => {
                return await prisma.user.update({
                    where: { userID },
                    data: {
                        profile: {
                            update: {
                                firstname,
                                lastname,
                                phone,
                            }
                        },
                    }
                })
            }
        })
        t.field("updateUserVerifiedAcc", {
            type: "user",
            args: { email: nonNull("EmailAddress") },
            resolve: async (_, { email }): Promise<any> => {
                return await prisma.user.update({
                    data: {
                        verified: true
                    },
                    where: {
                        email
                    }
                })
            }
        })
        t.field("deleteUserAcc", {
            type: "user",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }): Promise<any> => {
                return await prisma.user.delete({
                    where: { userID }
                })
            }
        })
        t.field("resetUserPassword", {
            type: "user",
            args: { email: nonNull("EmailAddress"), password: nonNull(stringArg()), retype: nonNull(stringArg()) },
            resolve: async (_, { email, password, retype }): Promise<any> => {


                if (password !== retype) throw new GraphQLError("Password is not matched");

                const pass = await bcryptjs.hash(password, 12);

                return await prisma.user.update({
                    data: { password: pass },
                    where: { email }
                })
            }
        })
        t.field("updatePassword", {
            type: "user",
            args: { userID: nonNull(idArg()), current: nonNull(stringArg()), newpass: nonNull(stringArg()) },
            resolve: async (_, { userID, current, newpass }): Promise<any> => {


                const users = await prisma.user.findUnique({
                    where: {
                        userID
                    }
                })


                const compare = await bcryptjs.compare(current, users.password)

                if (!compare) throw new GraphQLError("Password mismatched")

                const pass = await bcryptjs.hash(newpass, 12)


                return await prisma.user.update({
                    data: {
                        password: pass,
                        updateAt: new Date(Date.now())
                    },
                    where: {
                        userID
                    }
                })
            }
        })
        t.field("login", {
            type: "token",
            args: { email: nonNull(idArg()), password: nonNull(stringArg()) },
            resolve: async (_, { email, password }): Promise<any> => {
                const users = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if (users && users?.verified === false) throw new GraphQLError("Please try to verify your account to unlock the features.")


                if (!users) throw new GraphQLError("Incorrect Email address or Password");

                const pass = await bcryptjs.compareSync(password, users.password);

                if (!pass) throw new GraphQLError("Incorrect Email address or Password");


                const token = sign({ userID: users.userID, role: users.role, verfied: users.verified }, "physio_token", {
                    algorithm: "HS256",
                })


                return { token }

            }
        })
        t.field("findEmailAddress", {
            type: "user",
            args: { email: nonNull("EmailAddress") },
            resolve: async (_, { email }): Promise<any> => {

                if (email.length === 0 || email === null) throw new GraphQLError("Field should not be empty")

                const emails = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if (!emails) throw new GraphQLError("Email address not found")
                return emails
            }
        })
    },
})