import { enumType, extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";

export const EquipmentQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllEquipment", {
            type: "equipment",
            args: { inventories: "inventory", orders: "sort" },
            resolve: async (_, { inventories, orders, }): Promise<any> => {
                return await prisma.equipment.findMany({
                    where: {
                        inventory: inventories
                    },
                    orderBy: {
                        name: orders,

                    }
                })
            }
        })
        t.int("getInventoryExpiration", {
            resolve: async (): Promise<any> => {
                const inv = await prisma.$queryRawUnsafe(`SELECT COUNT(*)
                FROM public.equipment
                WHERE "expireDate" > CURRENT_DATE - INTERVAL '1 Year'
                AND  "expireDate" <= CURRENT_DATE + INTERVAL '7 DAY'`)

                return parseInt(inv[ 0 ].count)
            }
        })
        t.list.field("getInventoryBySearch", {
            type: "equipment",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.equipment.findMany({
                    where: {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                })
            }
        })
    }
})