import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";



export const FeedbackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createMyFeedback", {
            type: "feedback",
            args: { feedback: nonNull(stringArg()), userID: nonNull(idArg()), rating: nonNull(intArg()), appointmentID: nonNull(idArg()) },
            resolve: async (_, { feedback, userID, rating, appointmentID }): Promise<any> => {
                return await prisma.feedback.create({
                    data: {
                        feedback,
                        rating,
                        appointment: {
                            connect: {
                                appointmentID
                            }
                        },
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("createFeedback", {
            type: "feedback",
            args: { feedback: nonNull(stringArg()), userID: nonNull(idArg()), rating: nonNull(intArg()) },
            resolve: async (_, { feedback, rating, userID }): Promise<any> => {
                return await prisma.feedback.create({
                    data: {
                        feedback, rating, user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("deleteMyFeedback", {
            type: "feedback",
            args: { feedbackID: nonNull(idArg()) },
            resolve: async (_, { feedbackID }): Promise<any> => {
                return await prisma.feedback.delete({
                    where: {
                        feedbackID
                    }
                })
            }
        })
    },
})