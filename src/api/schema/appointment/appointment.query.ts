import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { startOfMonth, subMonths, startOfQuarter, subQuarters, startOfYear, subYears, format } from 'date-fns'



const currentDate = new Date()



const previousMonthStart = startOfMonth(subMonths(currentDate, 1))
const previousQuarterStart = startOfQuarter(subQuarters(currentDate, 3));
const previousSemiAnnualStart = startOfMonth(subMonths(currentDate, 6));
const previousYearStart = startOfYear(subYears(currentDate, 1));

export const appointmentQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllAppointment", {
            type: "appointment",
            resolve: async (): Promise<any> => {
                return await prisma.appointment.findMany()
            }
        })
        t.list.field("getAllAppointmentToday", {
            type: "appointment",
            resolve: async (): Promise<any> => {
                return await prisma.appointment.findMany({
                    where: {
                        date: new Date(format(new Date(), "yyyy-MM-dd"))
                    }
                })
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
            type: "appointmentChart",
            args: { dateFilter: nonNull(stringArg()), platform: nonNull("platform") },
            resolve: async (_, { dateFilter, platform }): Promise<any> => {
                switch (dateFilter) {
                    case "Monthly":
                        const appointment = await prisma.appointment.groupBy({
                            by: [ "createdAt" ],
                            where: {
                                platform,
                                createdAt: {
                                    gte: previousMonthStart,
                                    lte: currentDate
                                }
                            },
                            _count: {
                                _all: true
                            }
                        })

                        return appointment.map(({ _count, createdAt }) => {
                            return { _all: _count._all, createdAt: createdAt }

                        })

                    case "Quarterly":
                        const ap = await prisma.appointment.groupBy({
                            by: [ "createdAt" ],
                            where: {
                                createdAt: {
                                    gte: previousQuarterStart,
                                    lte: currentDate
                                },
                            }, _count: {
                                _all: true
                            }
                        })
                        return ap.map(({ _count, createdAt }) => {
                            return { _all: _count._all, createdAt: createdAt }
                        })

                    case "SemiAnnually":
                        const appoint = await prisma.appointment.groupBy({
                            by: [ "createdAt" ],
                            where: {
                                createdAt: {
                                    gte: previousSemiAnnualStart,
                                    lte: currentDate
                                }
                            }, _count: {
                                _all: true
                            }
                        })
                        return appoint.map(({ _count, createdAt }) => {
                            return { _all: _count._all, createdAt: createdAt }
                        })
                    case "Annually":
                        const at = await prisma.appointment.groupBy({
                            by: [ "createdAt" ],
                            where: {
                                createdAt: {
                                    gte: previousYearStart,
                                    lte: currentDate
                                }
                            }, _count: {
                                _all: true
                            }
                        })
                        return at.map(({ _count, createdAt }) => {
                            return { _all: _count._all, createdAt: createdAt }
                        })

                }
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