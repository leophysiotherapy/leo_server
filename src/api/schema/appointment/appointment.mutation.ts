import { enumType, extendType, idArg, inputObjectType, nonNull, stringArg } from "nexus";
import { prisma } from "../../../util/index.js";
import { EmailReminder, SendEmail } from "../../../helpers/sendgrid.js";
import { TextClient } from "../../../helpers/twillio.js";
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
                    include: {
                        profile: true
                    }
                })

                const dateFormated = new Date(date).toISOString().slice(0, 10)


                if (time === "09:00 AM") {


                    TextClient(findUserID.profile.phone, `${dateFormated}T08:00:00`)
                    console.log(`${dateFormated}T08:00:00`)
                    const dateTargetString = `${dateFormated}T08:50:00`

                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000
                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    // <head>
                    //     <meta charset="UTF-8">
                    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    //     <link href="/index.css" rel="stylesheet" />

                    // <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    //     <table style="width: 500px; border: 1px solid #ccc">
                    //         <tr style="height: 60px;">
                    //             <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 65px;">
                    //             <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                    //                 scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 65px;">
                    //             <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                    //                 ready to attend to your patient at the scheduled time.
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 60px;">
                    //             <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                    //                 patients.
                    //             </td>
                    //         </tr>
                    //         <tr style=" height: 40px;">
                    //             <td style="font-family: Poppins;">
                    //                 Best regards,
                    //             </td>
                    //         </tr>

                    //         <tr style="height: 0;">

                    //             <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                    //         </tr>
                    //     </table>
                    // </body>

                     </html>` , dateSecondsFormatted)

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
                else if (time === "10:00 AM") {
                    TextClient(findUserID.profile.phone, `${dateFormated}T09:00:00`)

                    const dateTargetString = `${dateFormated}T09:50:00`
                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000

                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    // <head>
                    //     <meta charset="UTF-8">
                    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    //     <link href="/index.css" rel="stylesheet" />

                    // <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    //     <table style="width: 500px; border: 1px solid #ccc">
                    //         <tr style="height: 60px;">
                    //             <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 65px;">
                    //             <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                    //                 scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 65px;">
                    //             <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                    //                 ready to attend to your patient at the scheduled time.
                    //             </td>
                    //         </tr>
                    //         <tr style="height: 60px;">
                    //             <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                    //                 patients.
                    //             </td>
                    //         </tr>
                    //         <tr style=" height: 40px;">
                    //             <td style="font-family: Poppins;">
                    //                 Best regards,
                    //             </td>
                    //         </tr>

                    //         <tr style="height: 0;">

                    //             <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                    //         </tr>
                    //     </table>
                    // </body>

                    </html>` , dateSecondsFormatted)
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


                    TextClient(findUserID.profile.phone, `${dateFormated}T10:00:00`)

                    const dateTargetString = `${dateFormated}T10:50:00`

                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000

                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />

                    <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                        <table style="width: 500px; border: 1px solid #ccc">
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                    scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                    ready to attend to your patient at the scheduled time.
                                </td>
                            </tr>
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                    patients.
                                </td>
                            </tr>
                            <tr style=" height: 40px;">
                                <td style="font-family: Poppins;">
                                    Best regards,
                                </td>
                            </tr>

                            <tr style="height: 0;">

                                <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                            </tr>
                        </table>
                    </body>

                    </html>` , dateSecondsFormatted)

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

                    TextClient(findUserID.profile.phone, `${dateFormated}T12:00:00`)

                    const dateTargetString = `${dateFormated}T12:50:00`

                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000

                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />

                    <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                        <table style="width: 500px; border: 1px solid #ccc">
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                    scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                    ready to attend to your patient at the scheduled time.
                                </td>
                            </tr>
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                    patients.
                                </td>
                            </tr>
                            <tr style=" height: 40px;">
                                <td style="font-family: Poppins;">
                                    Best regards,
                                </td>
                            </tr>

                            <tr style="height: 0;">

                                <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                            </tr>
                        </table>
                    </body>

                    </html>` , dateSecondsFormatted)
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

                    TextClient(findUserID.profile.phone, `${dateFormated}T13:00:00`)
                    const dateTargetString = `${dateFormated}T13:50:00`

                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000
                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />

                    <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                        <table style="width: 500px; border: 1px solid #ccc">
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                    scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                    ready to attend to your patient at the scheduled time.
                                </td>
                            </tr>
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                    patients.
                                </td>
                            </tr>
                            <tr style=" height: 40px;">
                                <td style="font-family: Poppins;">
                                    Best regards,
                                </td>
                            </tr>

                            <tr style="height: 0;">

                                <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                            </tr>
                        </table>
                    </body>

                    </html>` , dateSecondsFormatted)

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


                    TextClient(findUserID.profile.phone, `${dateFormated}T14:00:00`)
                    const dateSecondsFormatted = new Date(`${dateFormated}T14:50:00`).getTime() / 1000

                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />

                    <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                        <table style="width: 500px; border: 1px solid #ccc">
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                    scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                    ready to attend to your patient at the scheduled time.
                                </td>
                            </tr>
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                    patients.
                                </td>
                            </tr>
                            <tr style=" height: 40px;">
                                <td style="font-family: Poppins;">
                                    Best regards,
                                </td>
                            </tr>

                            <tr style="height: 0;">

                                <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                            </tr>
                        </table>
                    </body>

                    </html>` , dateSecondsFormatted)


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
                else if (time === "04:00 PM") {
                    TextClient(findUserID.profile.phone, `${dateFormated}T15:00:00`)
                    const dateTargetString = `${dateFormated}T15:50:00`
                    const dateSecondsFormatted = new Date(dateTargetString).getTime() / 1000

                    EmailReminder('leonardophysiotherapy@gmail.com', 'Appointment', `<html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="/index.css" rel="stylesheet" />

                    <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                        <table style="width: 500px; border: 1px solid #ccc">
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Dear Dr. Leonardo,</h2>
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">This is a friendly reminder that you have an upcoming appointment
                                    scheduled later in the next 10 minutes. Your patient is eagerly anticipating their visit with you.
                                </td>
                            </tr>
                            <tr style="height: 65px;">
                                <td style="font-family: Poppins;">We kindly request that you prepare for the session and ensure that you're
                                    ready to attend to your patient at the scheduled time.
                                </td>
                            </tr>
                            <tr style="height: 60px;">
                                <td style="font-family: Poppins;">Thank you for your commitment to providing exceptional care to your
                                    patients.
                                </td>
                            </tr>
                            <tr style=" height: 40px;">
                                <td style="font-family: Poppins;">
                                    Best regards,
                                </td>
                            </tr>

                            <tr style="height: 0;">

                                <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                            </tr>
                        </table>
                    </body>

                    </html>` , dateSecondsFormatted)

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
        t.field("updateDateAppointment", {
            type: "appointment",
            args: { date: nonNull(stringArg()), time: nonNull(stringArg()), appointmentID: nonNull(idArg()), reason: nonNull(stringArg()) },
            resolve: async (_, { appointmentID, date, time, reason }): Promise<any> => {

                const findUser = await prisma.user.findMany({
                    where: {
                        appointment: {
                            some: {
                                appointmentID
                            }
                        },
                    },
                    include: {
                        profile: true
                    }
                })
                const appointment = await prisma.appointment.update({
                    data: {
                        date: new Date(date),
                        time
                    },
                    where: {
                        appointmentID
                    },
                })



                SendEmail(`${findUser[ 0 ].email}`, "Rescheduling of Consultation", `<html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="/index.css" rel="stylesheet" />
                
                <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    <table style="width: 500px; border: 1px solid #ccc">
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;"> Dear ${findUser[ 0 ].profile.lastname}, ${findUser[ 0
                    ].profile.firstname}, </h2>
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;"> We regret to inform you that the upcoming consultation with Dr. Leonardo needs to be rescheduled due to ${reason}.Kindly access your dashboard in the website to see the newly set schedule of your appointment.
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;"> We apologize for any inconvenience caused and appreciate your
                                understanding.
                            </td>
                        </tr>
                        <tr style=" height: 40px;">
                            <td style="font-family: Poppins;">
                                Best regards,
                            </td>
                        </tr>
                        <tr style="height: 0;">
                            <td style="font-family: Poppins;"> Leonardo Physical Theraphy Rehabilitation Clinic </td>
                        </tr>
                    </table>
                </body>
                
                </html>`)


                return appointment
            }
        })
        t.field("cancelAdminAppointment", {
            type: "appointment",
            args: { reason: nonNull(stringArg()), appointmentID: nonNull(idArg()) },
            resolve: async (_, { appointmentID, reason }): Promise<any> => {




                const findUser = await prisma.user.findMany({
                    where: {
                        appointment: {
                            some: {
                                appointmentID
                            }
                        }
                    },
                    include: {
                        profile: true
                    }
                })
                const appointment = await prisma.appointment.update({
                    data: {
                        status: "canceled"
                    },
                    where: {
                        appointmentID
                    },
                    include: {
                        user: true
                    }
                })


                SendEmail(`${findUser[ 0 ].email}`, 'Consultation Cancellation Notice', `<html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="/index.css" rel="stylesheet" />
                
                <body style=" width: 100%; box-sizing: border-box;  margin-left: auto; margin-right: auto; padding: 10px;">
                    <table style="width: 500px; border: 1px solid #ccc">
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;"> Dear ${findUser[ 0 ].profile.firstname}, ${findUser[ 0 ].profile.lastname},</h2>
                            </td>
                        </tr>
                        <tr style="height: 60px;">
                            <td style="font-family: Poppins;">We regret to inform you that the scheduled consultation with Dr. Leonardo
                                has been canceled due to ${reason}. We apologize for any inconvenience this may cause.
                            </td>
                        </tr>
                        <tr style=" height: 40px;">
                            <td style="font-family: Poppins;">
                                Best regards,
                            </td>
                        </tr>
                
                        <tr style="height: 0;">
                
                            <td style="font-family: Poppins;">Leonardo Physical Theraphy Rehabilitation Clinic</td>
                        </tr>
                    </table>
                </body>
                
                </html>`)

                return appointment
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