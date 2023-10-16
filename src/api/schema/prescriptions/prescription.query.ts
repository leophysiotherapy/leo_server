import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";



export const PrescriptionQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllPrescription", {
            type: "prescription",
            resolve: async (): Promise<any> => {
                return await prisma.presciption.findMany()
            }
        })
        t.list.field("getPrescriptionsById", {
            type: "prescription",
            args: { prescriptionID: nonNull(idArg()) },
            resolve: async (_, { prescriptionID }): Promise<any> => {
                return await prisma.presciption.findMany({
                    where: { prescriptionID }
                })
            }
        })
        t.list.field("getFindPrescription", {
            type: "prescription",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.presciption.findMany({
                    where: {
                        patinet: {
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