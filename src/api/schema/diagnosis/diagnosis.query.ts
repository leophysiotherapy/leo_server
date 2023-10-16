import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";


export const DiagnosisQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllDiagnosis", {
            type: "diagnosis",
            resolve: async (): Promise<any> => {
                return await prisma.diagnosis.findMany()
            }
        })
        t.list.field("getDiagnosisID", {
            type: "diagnosis",
            args: { diagnosisID: nonNull(idArg()) },
            resolve: async (_, { diagnosisID }): Promise<any> => {
                return await prisma.diagnosis.findMany({
                    where: { diagnosisID }
                })
            }
        })
    },
})