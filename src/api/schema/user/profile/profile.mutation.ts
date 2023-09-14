import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../../util/index.js";



export const ProfileMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateContactNumber", {
            type: "profile",
            args: { userID: nonNull(idArg()), phone: nonNull("PhoneNumber") },
            resolve: async (_, { userID, phone}): Promise<any> => {
                return prisma.profile.update({
                    data: {
                        phone
                    },
                    where: {
                        userID
                    }
                })
            }
        })
    }
})