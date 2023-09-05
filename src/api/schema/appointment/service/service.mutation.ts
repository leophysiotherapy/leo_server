import { extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma } from "../../../../util/index.js";


export const serviceInput = inputObjectType({
    name: "serviceInput",
    definition(t) {
        t.string("service");
        t.string("description");
        t.float("price");
    },
})

export const serviceMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createService", {
            type: "service",
            args: { service: "serviceInput" },
            resolve: async (_, { service: { service, description, price } }): Promise<any> => {
                return await prisma.services.create({
                    data: {
                        service, description, price
                    }
                })
            }
        });
        t.field("updateService", {
            type: "service",
            args: { serviceID: nonNull(idArg()), service: "serviceInput" },
            resolve: async (_, { serviceID, service: { description, price, service } }): Promise<any> => {
                return await prisma.services.update({
                    data: {
                        description, price, service,
                        updatedAt: new Date(Date.now())
                    }, where: {
                        serviceID
                    }
                })
            }
        })
    }
})