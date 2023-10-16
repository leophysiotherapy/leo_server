import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";


export const UserObject = objectType({
    name: "user",
    definition(t) {
        t.id("userID");
        t.email("email");
        t.string("password");
        t.string("role");
        t.boolean("verified");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.list.field("profile", {
            type: "profile",
            resolve: async ({ userID }): Promise<any> => {
                return await prisma.profile.findMany({
                    where: {
                        userID
                    }
                })
            }
        })
        t.list.field("appointment", {
            type: "appointment",
            resolve: async ({ userID }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        user: {
                            some: {
                                userID
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })
            }
        })
        t.list.field("diagnosis", {
            type: "diagnosis",
            resolve: async ({ userID }): Promise<any> => {
                return await prisma.diagnosis.findMany({
                    where: {
                        userID
                    }
                })
            }
        })
        t.list.field('prescription', {
            type: "prescription",
            resolve: async ({ userID }): Promise<any> => {
                return await prisma.presciption.findMany({
                    where: {
                        userID
                    }
                })
            }
        })
    }
})

export const TokenObject = objectType({
    name: "token",
    definition(t) {
        t.string("token");
    },
})