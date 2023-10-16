import { extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma, pubsub } from "../../../util/index.js";


export const FAQsInput = inputObjectType({
    name: "faqsInput",
    definition(t) {
        t.string("faqs");
        t.string("answer");
    },
})


export const FAQsMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field('createFAQs', {
            type: "faqs",
            args: { faqs: nonNull("faqsInput"), userID: nonNull(idArg()) },
            resolve: async (_, { faqs: { answer, faqs }, userID }): Promise<any> => {
                const faq = await prisma.faqs.create({
                    data: {
                        answer, faqs,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })

                pubsub.publish("createFAQs", faq)

                return faqs

            }
        })
        t.field('updateFAQs', {
            type: "faqs",
            args: { faqs: nonNull("faqsInput"), faqsID: nonNull(idArg()) },
            resolve: async (_, { faqs: { answer, faqs }, faqsID }): Promise<any> => {
                return await prisma.faqs.update({
                    data: { answer, faqs, updateAt: new Date(Date.now()) },
                    where: { faqsID }
                })
            }
        })
        t.field("deleteFAQs", {
            type: "faqs",
            args: { faqsID: nonNull(idArg()) },
            resolve: async (_, { faqsID }): Promise<any> => {
                return await prisma.faqs.delete({
                    where: { faqsID }
                })
            }
        })
    },
})