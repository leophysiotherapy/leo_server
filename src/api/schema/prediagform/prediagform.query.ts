import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";


export const PreDiagQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllPreDiagnosticForm", {
            type: "prediagform",
            resolve: async (): Promise<any> => {
                return await prisma.prediag.findMany()
            }
        })
        t.list.field("getPreDiagnositicFormId", {
            type: "prediagform",
            args: { prediagnosticID: nonNull(idArg()) },
            resolve: async (_, { prediagnosticID }): Promise<any> => {
                return await prisma.prediag.findMany({
                    where: {
                        prediagnosticID
                    }
                })
            }
        })
        t.list.field("getSearchPreDiagnosticForm", {
            type: "prediagform",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.prediag.findMany({
                    where: {
                        user: {
                            profile: {
                                firstname: {
                                    contains: search,
                                    mode: "insensitive"
                                }
                            }
                        }
                    }
                })
            }
        })
    },
})