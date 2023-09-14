import { extendType, idArg, nonNull } from "nexus";
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
        t.list.field("getServiceById", {
            type: "service",
            args: { serviceID: nonNull(idArg()) },
            resolve: async (_, { serviceID }): Promise<any> => {
                return await prisma.services.findMany({
                    where: {
                        serviceID
                    }
                })
            }
        })
    },
})