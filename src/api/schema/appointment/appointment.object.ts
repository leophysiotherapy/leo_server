import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";


export const appointmentObject = objectType({
    name: "appointment",
    definition(t) {
        t.id("appointmentID");
        t.date("date");
        t.string("time");
        t.string("platform");
        t.string("link");
        t.string("status");
        t.int("amount");
        t.string('services')
        t.list.field("patients", {
            type: "user",
            resolve: async ({ appointmentID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        appointment: {
                            some: {
                                appointmentID
                            }
                        }
                    }
                })
            }
        })
    },
})