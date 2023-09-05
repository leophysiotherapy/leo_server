import { extendType, idArg, inputObjectType, nonNull } from "nexus"
import { prisma } from "../../../util/index.js"



export const equipementInput = inputObjectType({
    name: "equipmentInput",
    definition(t) {
        t.string("name");
        t.string("description");
        t.string("category");
        t.int("quantity");
        t.date("expireDate");
    },
})


export const EquipmentMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createEquipment", {
            type: "equipment",
            args: { equipment: "equipmentInput", userID: nonNull(idArg()) },
            resolve: async (_, { equipment: { name, description, category, quantity, expireDate }, userID }): Promise<any> => {
                return await prisma.equipment.create({
                    data: {
                        category, description, expireDate, name, quantity,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("udpateEquipment", {
            type: "equipment",
            args: { equipmentID: nonNull(idArg()), equipment: "equipmentInput" },
            resolve: async (_, { equipmentID, equipment: { name, description, category, quantity, expireDate } }): Promise<any> => {
                return await prisma.equipment.update({
                    data: {
                        category, description, expireDate, name, quantity, updateAt: new Date(Date.now())
                    },
                    where: {
                        equipmentID
                    }
                })
            }
        })
        t.field("deleteEquipment", {
            type: "equipment",
            args: { equipmentID: nonNull(idArg()) },
            resolve: async (_, { equipmentID }): Promise<any> => {
                return await prisma.equipment.delete({
                    where: {
                        equipmentID
                    }
                })
            }
        })
    },
})