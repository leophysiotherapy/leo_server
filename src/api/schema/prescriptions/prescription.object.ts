import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";



export const prescriptionObject = objectType({
    name: "prescription",
    definition(t) {
        t.id("prescriptionID");
        t.string("precription");
        t.int("dose");
        t.int("amount");
        t.string("advice");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.list.field("patient", {
            type: "user",
            resolve: async ({ prescriptionID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        prescription: {
                            some: {
                                prescriptionID
                            }
                        }
                    }
                })
            }
        })
    },
})