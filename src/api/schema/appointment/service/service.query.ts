import { extendType } from "nexus";
import { prisma } from "../../../../util/index.js";



export const ServiceQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field('getAllServcie', {
            type: "service",
            resolve: async (): Promise<any> => {
                return await prisma.services.findMany()
            }
        })
    },
})