import { enumType, extendType, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";

export const sortEq = enumType({
    name: "sortType",
    members: [ "asc", "desc" ]
})

export const EquipmentQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllEquipment", {
            type: "equipment",
            resolve: async (): Promise<any> => {
                return await prisma.equipment.findMany()
            }
        })
        t.list.field("getSortEquipment", {
            type: "equipment",
            args: { name: "sortType", quantity: "sortType", expireDate: "sortType" },
            resolve: async (_, { name, quantity, expireDate }): Promise<any> => {
                if (name) {
                    const names = await prisma.equipment.findMany({
                        orderBy: {
                            name
                        }
                    })
                    return names
                }
                else if (quantity) {
                    const quantities = await prisma.equipment.findMany({
                        orderBy: {
                            quantity
                        }
                    })

                    return quantities
                } else {
                    const expiredDates = await prisma.equipment.findMany({
                        orderBy: {
                            expireDate
                        }
                    })

                    return expiredDates
                }
            }
        })
    }
})