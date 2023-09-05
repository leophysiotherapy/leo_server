import { idArg, nonNull, objectType } from "nexus";
import { prisma } from "../../../../util/index.js";



export const feedbackObject = objectType({
    name: "feedback",
    definition(t) {
        t.id("feedbackID");
        t.string("feedback");
        t.datetime("createdAt");
        t.datetime("createdAt");
        t.list.field("users", {
            type: "user",
            args: { feedbackID: nonNull(idArg()) },
            resolve: async (_, { feedbackID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        feedback: {
                            some: {
                                feedbackID
                            }
                        }
                    }
                })
            }
        })
    },
})