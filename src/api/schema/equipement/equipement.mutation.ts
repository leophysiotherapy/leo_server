import { extendType, idArg, inputObjectType, nonNull, enumType } from "nexus"
import { prisma } from "../../../util/index.js"
import { GraphQLError } from "graphql";


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
            resolve: async (_, { equipment: { name, description, quantity, expireDate }, userID, inventory }, { req, res }): Promise<any> => {

                if (!name) throw new GraphQLError("Name is required")
                if (!description) throw new GraphQLError("Description is required")
                if (!quantity) throw new GraphQLError("Quantity is required", {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
                if (!expireDate) throw new GraphQLError("Date is required")

                if (!inventory) throw new GraphQLError("Please choose an option before proceeding")

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

                if (!name) throw new GraphQLError("Name is required")
                if (!description) throw new GraphQLError("Description is required")
                if (!quantity) throw new GraphQLError("Quantity is required", {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })

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