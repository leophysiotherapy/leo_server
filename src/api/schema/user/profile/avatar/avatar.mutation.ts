import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../../util/index.js";



export const avatarMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createProfileAvatar", {
            type: "avatar",
            args: { profileID: nonNull(idArg()), avatar: nonNull(stringArg()) },
            resolve: async (_, { profileID, avatar }): Promise<any> => {
                return await prisma.avatar.create({
                    data: {
                        avatar,
                        profile: {
                            connect: {
                                profileID
                            }
                        }
                    }
                })
            }
        })
    },
})