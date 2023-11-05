import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { ImageUpload } from "../../../helpers/aws.js";

export const ServiceMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createServices", {
            type: "services",
            args: { file: "Upload", services: nonNull(stringArg()), descriptions: nonNull(stringArg()), },
            resolve: async (_, { descriptions, services, file }): Promise<any> => {

                const { createReadStream, filename } = await file;

                return await prisma.services.create({
                    data: {
                        services,
                        descriptions, image: await ImageUpload(filename, createReadStream),
                        price: 175
                    }
                })
            }
        })
        t.field('updateServices', {
            type: "services",
            args: { servicesID: nonNull(idArg()), descriptions: nonNull(stringArg()), services: nonNull(stringArg()), file: "Upload" },
            resolve: async (_, { servicesID, descriptions, services, file }): Promise<any> => {

                if (file) {
                    const { createReadStream, filename } = await file;
                    return await prisma.services.update({
                        data: {
                            descriptions, image: await ImageUpload(filename, createReadStream), services
                        },
                        where: {
                            servicesID
                        }
                    })
                } else {
                    return await prisma.services.update({
                        data: {
                            descriptions, services
                        },
                        where: {
                            servicesID
                        }
                    })
                }

            }
        })
        t.field("deleteServices", {
            type: "services",
            args: { servicesID: nonNull(idArg()) },
            resolve: async (_, { servicesID }): Promise<any> => {
                return await prisma.services.delete({
                    where: {
                        servicesID
                    }
                })
            }
        })
    },
})