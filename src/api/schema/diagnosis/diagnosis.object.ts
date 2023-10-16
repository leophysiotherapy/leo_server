import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";



export const DiagnosisObject = objectType({
    name: "diagnosis",
    definition(t) {
        t.id("diagnosisID");
        t.string("diagnosis");
        t.datetime("createdAt");
        t.datetime("createdAt");
        t.list.field("patient", {
            type: "user",
            resolve: async ({ diagnosisID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        diagnosis: {
                            some: {
                                diagnosisID
                            }
                        }
                    }
                })
            }
        })
    },
})