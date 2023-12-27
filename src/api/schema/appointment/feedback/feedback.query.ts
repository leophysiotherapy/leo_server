import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";


export const FeedbackQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllFeedback", {
            type: "feedback",
            resolve: async (): Promise<any> => {
                return await prisma.feedback.findMany({
                    orderBy: {
                        creatdAt: "desc"
                    }
                })
            }
        })

        t.list.field("getSearchFeedback", {
            type: "feedback",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.feedback.findMany({
                    where: {
                        user: {
                            some: {
                                profile: {
                                    firstname: {
                                        contains: search,
                                        mode: "insensitive"
                                    }
                                }
                            }
                        }
                    }
                })
            }
        })

        t.list.field("getFeedbackById", {
            type: "feedback",
            args: { feedbackID: nonNull(idArg()) },
            resolve: async (_, { feedbackID }): Promise<any> => {
                return await prisma.feedback.findMany({
                    where: {
                        feedbackID
                    }
                })
            }
        })

        t.list.field("getAllFeedbackByUserId", {
            type: "feedback",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }): Promise<any> => {
                return await prisma.feedback.findMany({
                    where: {
                        user: {
                            some: {
                                userID
                            }
                        }
                    }
                })
            }
        })
    },
})