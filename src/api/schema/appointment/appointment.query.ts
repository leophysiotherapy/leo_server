import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { format } from 'date-fns'
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
                        date: new Date(format(new Date(), "yyyy-MM-dd")),
                        NOT: {
                            status: "finished"
                        }
                    },
                    orderBy: {
                        createdAt: "desc",
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
                    },
                    orderBy: {
                        createdAt: "asc"
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
                    },
                    orderBy: {
                        createdAt: "desc"
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
                        const appointment = await prisma.$queryRawUnsafe(`SELECT 
                        DATE_TRUNC('month', public.appointment."createdAt") AS month,
                        CAST(COUNT(*) AS INT) AS AppointmentCount
                    FROM appointment
                    WHERE platform = '${platform}'
                    GROUP BY  month
                    ORDER BY  month;`) as any

                        return appointment.map(({ month, appointmentcount }) => {
                            return { _all: appointmentcount, createdAt: month }

                        })

                    case "Quarterly":
                        const appointmentQuerterly = await prisma.$queryRawUnsafe(`SELECT 
                        DATE_TRUNC('quarter', public.appointment."createdAt") AS quarterly,
                        CAST(COUNT(*) AS INT) AS AppointmentCount
                    FROM appointment
                    WHERE platform = '${platform}'
                    GROUP BY  quarterly
                    ORDER BY  quarterly;`) as any

                        return appointmentQuerterly.map(({ quarterly, appointmentcount }) => {
                            return { _all: appointmentcount, createdAt: quarterly }

                        })
                    case "SemiAnnually":
                        const appointmentSemiAnnualy = await prisma.$queryRawUnsafe(`SELECT 
                        DATE_PART('year', public.appointment."createdAt") AS Year,
                        CASE 
                            WHEN DATE_PART('month', public.appointment."createdAt") <= 6 THEN 1
                            ELSE 2
                        END AS SemiAnnual,
                        CAST(COUNT(*) AS INT) AS AppointmentCount
                    FROM appointment
                    WHERE platform = '${platform}'
                    GROUP BY Year, SemiAnnual
                    ORDER BY Year, SemiAnnual;`) as any

                        return appointmentSemiAnnualy.map(({ year, appointmentcount }) => {
                            return { _all: appointmentcount, createdAt: format(new Date(`${year}-01-01`), "yyyy-MM-dd") }

                        })
                    case "Annually":
                        const appointmentYear = await prisma.$queryRawUnsafe(`SELECT 
                        DATE_TRUNC('year', public.appointment."createdAt") AS year,
                        CAST(COUNT(*) AS INT) AS AppointmentCount
                    FROM appointment
                    WHERE platform = '${platform}'
                    GROUP BY  year
                    ORDER BY  year;`) as any

                        return appointmentYear.map(({ year, appointmentcount }) => {
                            return { _all: appointmentcount, createdAt: year }

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
                    orderBy: {
                        createdAt: "desc"
                    }
                })
            }
        })
    },
})