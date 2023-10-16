import { extendType, idArg, inputObjectType, nonNull, enumType } from "nexus"
import { prisma } from "../../../util/index.js"



export const equipementInput = inputObjectType({
    name: "equipmentInput",
    definition(t) {
        t.string("name");
        t.string("description");
        t.int("quantity");
        t.date("expireDate");
    },
})



export const equipementEnum = enumType({
    name: "inventory",
    members: [ "equipment", "supplies" ]
})


export const EquipmentMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createEquipment", {
            type: "equipment",
            args: { equipment: "equipmentInput", userID: nonNull(idArg()), inventory: "inventory" },
            resolve: async (_, { equipment: { name, description, quantity, expireDate }, userID, inventory }): Promise<any> => {
                return await prisma.equipment.create({
                    data: {
                        description, expireDate, name, quantity,
                        inventory,

                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("updateEquipment", {
            type: "equipment",
            args: { equipmentID: nonNull(idArg()), equipment: "equipmentInput" },
            resolve: async (_, { equipmentID, equipment: { name, description, quantity, expireDate } }): Promise<any> => {
                return await prisma.equipment.update({
                    data: {
                        description, expireDate, name, quantity, updateAt: new Date(Date.now())
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