import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";




export const appointmentQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllAppointment", {
            type: "appointment",
            resolve: async (): Promise<any> => {
                return await prisma.appointment.findMany()
            }
        })
        t.list.field("getAllAppointmentID", {
            type: "appointment",
            args: { appointmentID: nonNull(idArg()) },
            resolve: async (_, { appointmentID }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        appointmentID
                    }
                })
            }
        })
    },
})