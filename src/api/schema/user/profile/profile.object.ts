import { objectType } from "nexus";
import { prisma } from "../../../../util/index.js";



export const ProfileObject = objectType({
    name: "profile",
    definition(t) {
        t.id("profileID");
        t.string("firstname");
        t.string("lastname");
        t.phone("phone");
        t.nullable.string("expertise");
        t.nullable.string("designation");
        t.nullable.phone("emergencyPhone");
        t.list.field("avatar", {
            type: "avatar",
            resolve: async ({ profileID }): Promise<any> => {
                return await prisma.avatar.findMany({
                    where: {
                        profileID
                    }
                })
            }
        })
    }
})