import { enumType, extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import googleCalendar from "../../../helpers/calendar.js";

export const statusEnum = enumType({
    name: "status",
    members: [ "upcoming", "done", "finished", "canceled" ]
})
export const appointmentEnum = enumType({
    name: "platform",
    members: [ "online", "f2f" ]
})


export const appointmentInput = inputObjectType({
    name: "appointmentInput",
    definition(t) {
        t.date("date");
        t.string("time");
        t.int("amount");
        t.string("services")
    },
})

export const appointmentMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createAppointment", {
            type: "appointment",
            args: { appointment: "appointmentInput", platform: "platform", userID: nonNull(idArg()), end: nonNull(stringArg()) },
            resolve: async (_, { appointment: { date, time, amount, services }, platform, userID }): Promise<any> => {


                const findUserID = await prisma.user.findUnique({
                    where: {
                        userID
                    },

                })

                if (time === "09:00 AM") {
                    await googleCalendar(date, "01:00", "02:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "10:00 AM") {
                    await googleCalendar(date, "02:00", "03:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "11:00 AM") {
                    await googleCalendar(date, "03:00", "04:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "01:00 PM") {
                    await googleCalendar(date, "05:00", "06:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "02:00 PM") {
                    await googleCalendar(date, "06:00", "07:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "03:00 PM") {
                    await googleCalendar(date, "07:00", "08:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                } else if (time === "04:00 PM") {
                    await googleCalendar(date, "08:00", "09:00", findUserID.email)
                    return await prisma.appointment.create({
                        data: {
                            date, time,
                            status: "upcoming",
                            platform,
                            link: "",
                            amount, services,
                            user: {
                                connect: {
                                    userID
                                }
                            }
                        }
                    })
                }
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
        t.field("updateAppointmentSession", {
            type: "appointment",
            args: { appointmentID: nonNull(idArg()), link: stringArg(), appointment: "appointmentInput", platform: "platform", status: "status" },
            resolve: async (_, { appointmentID, link, appointment: { date, time }, platform, status }): Promise<any> => {
                return await prisma.appointment.update({
                    data: {
                        link,
                        date, time,
                        platform,
                        status
                    },
                    where: {
                        appointmentID
                    }
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
        t.field("canceledAppointment", {
            type: "appointment",
            args: { appointmentID: nonNull(idArg()) },
            resolve: async (_, { appointmentID }): Promise<any> => {
                return await prisma.appointment.update({
                    data: {
                        status: "canceled"
                    },
                    where: {
                        appointmentID
                    }
                })
            }
        })
    },
})