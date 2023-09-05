import { enumType, extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { GraphQLError } from 'graphql'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from "jsonwebtoken";
import { SendEmail } from "../../../helpers/sendgrid.js";


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
        t.phone("phone");
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
            args: { user: "userInput", role: "roles" },
            resolve: async (_, { user: { email, firstname, lastname, phone, password, designation, emergencyPhone, expertise }, role }): Promise<any> => {
                const pass = await bcryptjs.hash(password, 12);
                return await prisma.user.create({
                    data: {
                        email, password: pass,
                        role,
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
        t.field("createPatientAccount", {
            type: "user",
            args: { user: "userInput" },
            resolve: async (_, { user: { email, firstname, lastname, phone, password, } }): Promise<any> => {
                const pass = await bcryptjs.hash(password, 12);

                await SendEmail(email)


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
                        }

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
            args: { userID: nonNull(idArg()), password: nonNull(stringArg()), retype: nonNull(stringArg()) },
            resolve: async (_, { userID, password, retype }): Promise<any> => {


                if (password !== retype) throw new GraphQLError("Password is not matched");

                const pass = await bcryptjs.hash(password, 12);

                return await prisma.user.update({
                    data: { password: pass },
                    where: { userID }
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

                if (users.verified == false) throw new GraphQLError("Please try to verify your account to unlock the features.")

                if (!users) throw new GraphQLError("Invalid Email address");

                const pass = await bcryptjs.compareSync(password, users.password);

                if (!pass) throw new GraphQLError("Invalid Password");


                const token = sign({ userID: users.userID, role: users.role, verfied: users.verified }, "physio_token", {
                    algorithm: "HS256",
                })


                return { token }

            }
        })
    },
})