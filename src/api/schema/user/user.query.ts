import { extendType, idArg, intArg, nonNull, stringArg } from "nexus";
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
        t.list.field("getPhysioUserByRole", {
            type: "user",
            args: { role: "roles", take: nonNull(intArg()), limit: nonNull(intArg()) },
            resolve: async (_, { role, take, limit }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        role
                    },
                    take,
                    skip: limit
                })
            }
        })
        t.list.field("getSearchuserByRole", {
            type: "user",
            args: { search: nonNull(stringArg()), role: "roles" },
            resolve: async (_, { search, role }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        role,
                        profile: {
                            firstname: {
                                contains: search,
                                mode: "insensitive"
                            }

                        }
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
        t.list.field("getAllPhysioUserBySearch", {
            type: "user",
            args: { role: "roles", search: nonNull(stringArg()) },
            resolve: async (_, { role, search }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        profile: {
                            firstname: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        role
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