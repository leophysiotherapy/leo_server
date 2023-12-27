import { extendType, idArg, nonNull, stringArg } from "nexus"
import { prisma } from "../../../util/index.js"
import { GraphQLError } from "graphql"


export const DiagnosisMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createPatientDiagnosis", {
            type: "diagnosis",
            args: { userID: nonNull(idArg()), diagnosis: nonNull(idArg()) },
            resolve: async (_, { diagnosis, userID }): Promise<any> => {

                if (!diagnosis) throw new GraphQLError("Diagnosis is required")
                return await prisma.diagnosis.create({
                    data: {
                        diagnosis,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("deletePatientDiagnosis", {
            type: "diagnosis",
            args: { diagnosisID: nonNull(idArg()) },
            resolve: async (_, { diagnosisID }): Promise<any> => {
                return await prisma.diagnosis.delete({
                    where: {
                        diagnosisID
                    }
                })
            }
        })
        t.field("updatePatientDiagnosis", {
            type: "diagnosis",
            args: { diagnosisID: nonNull(idArg()), diagnosis: nonNull(stringArg()) },
            resolve: async (_, { diagnosis, diagnosisID }): Promise<any> => {

                if (!diagnosis) throw new GraphQLError("Diagnosis is required")

                return await prisma.diagnosis.update({
                    data: { diagnosis, updatedAt: new Date(Date.now()) }, where: {
                        diagnosisID
                    }
                })
            }
        })
    },
})