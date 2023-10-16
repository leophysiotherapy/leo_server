import { extendType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";


export const FAQsQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllFAQs", {
            type: "faqs",
            resolve: async (): Promise<any> => {
                return await prisma.faqs.findMany()
            }
        })
        t.list.field("getFindFAQsQuestion", {
            type: "faqs",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.faqs.findMany({
                    where: {
                        faqs: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                })
            }
        })
    }
})