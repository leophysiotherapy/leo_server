import { idArg, nonNull, objectType } from "nexus";
import { prisma } from "../../../../util/index.js";



export const feedbackObject = objectType({
    name: "feedback",
    definition(t) {
        t.id("feedbackID");
        t.string("therapistName");
        t.string("date");
        t.string("time");
        t.string("question1");
        t.string("question2");
        t.string("question3");
        t.string("question4");
        t.string("question5");
        t.string("question6");
        t.string("question7");
        t.string("question8");
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