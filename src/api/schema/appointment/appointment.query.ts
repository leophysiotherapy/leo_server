import { extendType, idArg, nonNull, stringArg } from "nexus";
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
        t.list.field("getAppointmentByDateTime", {
            type: "appointment",
            args: { date: nonNull(stringArg()), platform: "platform" },
            resolve: async (_, { date, platform }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        date: new Date(date),
                        platform
                    }
                })
            }
        })
        t.list.field("getAppointmentByplatform", {
            type: "appointment",
            args: { platform: "platform" },
            resolve: async (_, { platform }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        platform
                    }
                })
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
        t.list.field("getAppointmentByPlatform", {
            type: "appointment",
            args: { platform: "platform" },
            resolve: async (_, { platform }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        platform
                    }
                })
            }
        })
        t.list.field("getReportsByPlatform", {
            type: "appointment",
            args: { platform: "platform" },
            resolve: async (_, { platform }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        platform
                    }
                })
            }
        })
        t.list.field("getAllPatientAppointment", {
            type: "appointment",
            args: { userID: nonNull(idArg()), platform: "platform", status: "status" },
            resolve: async (_, { userID, platform, status }): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        platform,
                        status,
                        user: {
                            some: {
                                userID
                            }
                        }
                    },

                })
            }
        })
    },
})