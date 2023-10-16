import { idArg, nonNull, objectType } from "nexus";
import { prisma } from "../../../../util/index.js";



export const feedbackObject = objectType({
    name: "feedback",
    definition(t) {
        t.id("feedbackID");
        t.string("feedback");
        t.datetime("createdAt");
        t.datetime("creatdAt");
        t.int("rating");
        t.list.field("appointment", {
            type: "appointment",
            resolve: async ({ feedbackID }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        feedbackID
                    }
                })
            }
        })
        t.list.field("users", {
            type: "user",
            resolve: async ({ feedbackID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        feedback: {
                            some: {
                                feedbackID
                            }
                        }
                    }
                })
            }
        })
    },
})