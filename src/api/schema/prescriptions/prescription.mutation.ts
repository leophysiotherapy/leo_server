import { extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";


export const presciptionInput = inputObjectType({
    name: "prescriptionInput",
    definition(t) {
        t.string("prescription");
        t.int("dose");
        t.int("amount");
        t.string("advice");
    },
})

export const presciptionMutation = extendType({
    type: "prescription",
    definition(t) {
        t.field("createPatientPrescription", {
            type: "prescription",
            args: { prescription: nonNull("prescriptionInput"), userID: nonNull(idArg()) },
            resolve: async (_, { prescription: { advice, amount, dose, prescription }, userID }): Promise<any> => {
                return await prisma.presciption.create({
                    data: {
                        advice, amount, dose, prescription,
                        patinet: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("deletePrescrpition", {
            type: "prescription",
            args: { prescriptionID: nonNull(idArg()) },
            resolve: async (_, { prescriptionID }): Promise<any> => {
                return await prisma.presciption.delete({
                    where: {
                        prescriptionID
                    }
                })
            }
        })
        t.field("updatePrescription", {
            type: "prescription",
            args: { prescriptionID: nonNull(idArg()), prescription: "prescriptionInput" },
            resolve: async (_, { prescription: { advice, amount, dose, prescription }, prescriptionID }): Promise<any> => {
                return await prisma.presciption.update({
                    where: { prescriptionID }, data: { advice, amount, dose, prescription, updatedAt: new Date(Date.now()) }
                })
            }
        })
    },
})