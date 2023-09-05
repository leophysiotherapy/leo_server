import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";



export const FeedbackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createMyFeedback", {
            type: "feedback",
            args: { feedback: nonNull(stringArg()), userID: nonNull(idArg()) },
            resolve: async (_, { feedback, userID }): Promise<any> => {
                return await prisma.feedback.create({
                    data: {
                        feedback,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("updateFeedback", {
            type: "feedback",
            args: { feedbackID: nonNull(idArg()), feedback: nonNull(stringArg()) },
            resolve: async (_, { feedbackID, feedback }): Promise<any> => {
                return await prisma.feedback.update({
                    data: {
                        feedback
                    },
                    where: {
                        feedbackID
                    }
                })
            }
        })
    },
})