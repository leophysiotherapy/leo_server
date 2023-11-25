import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { format, subDays, subMonths } from 'date-fns'
import { utcToZonedTime } from "date-fns-tz";
// import { sta}
const zonedTime = utcToZonedTime(new Date(Date.now()), "America/Los_Angeles")



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
                        date: new Date(format(zonedTime, "yyyy-MM-dd")),
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
                        createdAt: "desc"
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
                        EXTRACT(MONTH FROM "date") AS period,
                        COUNT(*) record_count
                    FROM
                        appointment WHERE "platform" = '${platform}'
                    GROUP BY
                        EXTRACT(MONTH FROM "date")
                    ORDER BY
                        period;
                    `) as any

                        return appointment.map(({ period, record_count }) => {
                            return { createdAt: period, _all: parseInt(record_count) }
                        })

                    case "Quarterly":
                        const appointmentQuerterly = await prisma.$queryRawUnsafe(`SELECT
                        EXTRACT(QUARTER FROM "date") AS period,
                        COUNT(*) AS record_count
                    FROM
                    appointment WHERE "platform" = '${platform}'
                    GROUP BY
                        EXTRACT(QUARTER FROM "date")
                    ORDER BY
                        period;
                        `) as any

                        return appointmentQuerterly.map(({ period, record_count }) => {
                            return { _all: parseInt(record_count), createdAt: period }

                        })
                    case "SemiAnnually":
                        const appointmentSemiAnnualy = await prisma.$queryRawUnsafe(`SELECT
                        CASE
                            WHEN EXTRACT(MONTH FROM "date") <= 6 THEN 'S1'
                            ELSE 'S2'
                        END AS period,
                        COUNT(*) AS record_count
                    FROM
                        appointment WHERE "platform" = '${platform}'
                    GROUP BY
                        CASE
                            WHEN EXTRACT(MONTH FROM "date") <= 6 THEN 'S1'
                            ELSE 'S2'
                        END
                    ORDER BY
                        period;`) as any

                        return appointmentSemiAnnualy.map(({ record_count, period }) => {
                            return { _all: parseInt(record_count), createdAt: period }

                        })
                    case "Annually":
                        const appointmentYear = await prisma.$queryRawUnsafe(`SELECT
                        EXTRACT(YEAR FROM "date") AS period,
                        COUNT(*) AS record_count
                    FROM
                        appointment WHERE "platform" = '${platform}'
                    GROUP BY
                        EXTRACT(YEAR FROM "date")
                    ORDER BY
                        period;`) as any

                        return appointmentYear.map(({ record_count, period }) => {
                            return { _all: parseInt(record_count), createdAt: period }

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