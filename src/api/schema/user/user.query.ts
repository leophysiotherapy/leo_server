import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";


export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllUser", {
            type: "user",
            resolve: async (): Promise<any> => {
                return await prisma.user.findMany()
            }
        })
        t.list.field("getAllPhysioStaff", {
            type: "user",
            resolve: async (): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        role: "staff"
                    }
                })
            }
        })
        t.list.field("getAllPhysioPatient", {
            type: "user",
            resolve: async (): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        role: "patient"
                    }
                })
            }
        })
        t.list.field('getAllPhysioId', {
            type: "user",
            args: { userID: nonNull(idArg()) },
            resolve: async (_, { userID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        userID
                    }
                })
            }
        })
    },
})