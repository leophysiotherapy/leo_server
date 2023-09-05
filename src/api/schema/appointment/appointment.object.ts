import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";


export const appointmentObject = objectType({
    name: "appointment",
    definition(t) {
        t.id("appointmentID");
        t.date("date");
        t.time("time");
        t.string("platform");
        t.string("link");
        t.string("status");
        t.list.field("services", {
            type: "service",
            resolve: async ({ appointmentID }): Promise<any> => {
                return await prisma.services.findMany({
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