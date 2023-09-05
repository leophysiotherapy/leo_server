import { extendType } from "nexus";
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
    }
})