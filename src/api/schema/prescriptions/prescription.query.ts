import { extendType, objectType } from "nexus";
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
    },
})