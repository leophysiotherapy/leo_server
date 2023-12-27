import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";
import { GraphQLError } from "graphql";



export const FeedbackMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createMyFeedback", {
            type: "feedback",
            args: { feedback: nonNull(stringArg()), therapistName: nonNull(stringArg()), date: nonNull(stringArg()), time: nonNull(stringArg()), question1: nonNull(stringArg()), question2: nonNull(stringArg()), question3: nonNull(stringArg()), question4: nonNull(stringArg()), question5: nonNull(stringArg()), question6: nonNull(stringArg()), question7: nonNull(stringArg()), question8: nonNull(stringArg()), userID: nonNull(idArg()), rating: nonNull(intArg()), appointmentID: nonNull(idArg()) },
            resolve: async (_, { feedback, userID, rating, appointmentID, date, question1, question2, question3, question4, question5, question6, question7, question8, therapistName, time }): Promise<any> => {

                if (!date) throw new GraphQLError("Date is required");
                if (!time) throw new GraphQLError("Time is required");
                if (!question1 || !question2 || !question3 || !therapistName || !question4 || !question5 || !question6 || !question7 || !question8) throw new GraphQLError("Field should not be empty")
                if (!rating) throw new GraphQLError("We're sorry, but it seems there was an issue submitting your rating. Please make sure you have selected a valid rating before trying again.")
                return await prisma.feedback.create({
                    data: {
                        date, question1, question2, question3, therapistName, time,
                        question4, question5, question6, question7, question8,
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
            args: { feedback: nonNull(stringArg()), therapistName: nonNull(stringArg()), date: nonNull(stringArg()), time: nonNull(stringArg()), question1: nonNull(stringArg()), question2: nonNull(stringArg()), question3: nonNull(stringArg()), question4: nonNull(stringArg()), question5: nonNull(stringArg()), question6: nonNull(stringArg()), question7: nonNull(stringArg()), question8: nonNull(stringArg()), userID: nonNull(idArg()), rating: nonNull(intArg()) },
            resolve: async (_, { feedback, userID, rating, date, question1, question2, question3, question4, question5, question6, question7, question8, therapistName, time }): Promise<any> => {

                if (!date) throw new GraphQLError("Date is required");
                if (!time) throw new GraphQLError("Time is required");
                if (!question1 || !question2 || !question3 || !therapistName || !question4 || !question5 || !question6 || !question7 || !question8) throw new GraphQLError("Field should not be empty")
                if (!rating) throw new GraphQLError("We're sorry, but it seems there was an issue submitting your rating. Please make sure you have selected a valid rating before trying again.")

                return await prisma.feedback.create({
                    data: {
                        date, question1, question2, question3, therapistName, time, question4, question5, question6, question7, question8,
                        feedback,
                        rating,
                        user: {
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