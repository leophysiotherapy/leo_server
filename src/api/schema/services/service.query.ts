import { extendType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";



export const ServiceQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllServices", {
            type: "services",
            resolve: async (): Promise<any> => {
                return await prisma.services.findMany()
            }
        })
        t.list.field("getServicesBySearch", {
            type: "services",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.services.findMany({
                    where: {
                        services: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                })
            }
        })
    },
})