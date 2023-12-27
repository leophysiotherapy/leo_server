import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../../util/index.js";
import { GraphQLError } from "graphql";



export const ProfileMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateContactNumber", {
            type: "profile",
            args: { userID: nonNull(idArg()), phone: nonNull("PhoneNumber") },
            resolve: async (_, { userID, phone }): Promise<any> => {
                if (!phone) throw new GraphQLError("Please Enter a valid phone number: (country code) + (area code) + (local number) (+1xxxxxxxxxx)")
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