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

                await SendEmail(email, `<html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="/index.css" rel="stylesheet" />
                    <title>Document</title>
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
                    <div>
                        <h2> Hello ${lastname}, ${firstname}</h2>
                        <br />
                        <br />
                        <span> Welcome to the Restore Rehabilitation Group!</span>
                        <br>
                        <br />
                        <span>
                            Before accessing your account, you must verify your email by
                            clicking
                            the button or link.
                        </span>
                        <br />
                        <span>
                            By activating your account, you can access the features that are necessary to continue on
                            the
                            website.
                        </span>
                        <br /> <br />
                        <span>Thank you,</span>
                        <div class="btn">
                
                            <a href="http://localhost:3000/verify/confirmed">Click this</a>
                        </div>
                        <br />
                        <br /> <br />
                        <span>Restore Rehabilitation Group</span>
                    </div>
                </body>
                
                </html>`)


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