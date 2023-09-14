import { enumType, extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { SendEmail } from "../../../helpers/sendgrid.js";

export const statusEnum = enumType({
    name: "status",
    members: [ "upcoming", "done", "finished" ]
})
export const appointmentEnum = enumType({
    name: "platform",
    members: [ "online", "f2f" ]
})


export const appointmentInput = inputObjectType({
    name: "appointmentInput",
    definition(t) {
        t.date("date");
        t.time("time");
    },
})

export const appointmentMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createAppointment", {
            type: "appointment",
            args: { appointment: "appointmentInput", serviceID: nonNull(idArg()), platform: "platform", userID: nonNull(idArg()), end: nonNull(stringArg()) },
            resolve: async (_, { serviceID, appointment: { date, time }, platform, userID }): Promise<any> => {
                return await prisma.appointment.create({
                    data: {
                        date, time,
                        status: "upcoming",
                        platform,
                        link: "",
                        services: {
                            connect: {
                                serviceID
                            }
                        },
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("deleteAppointment", {
            type: "appointment",
            args: { appointmentID: nonNull(idArg()) },
            resolve: async (_, { appointmentID }): Promise<any> => {
                return await prisma.appointment.delete({
                    where: { appointmentID }
                })
            }
        })
        t.field("updateAppointment", {
            type: "appointment",
            args: { appointmentID: nonNull(idArg()), status: "status" },
            resolve: async (_, { appointmentID, status }): Promise<any> => {
                return await prisma.appointment.update({
                    data: { status },
                    where: { appointmentID }
                })
            }
        })
    },
})