import { google } from "googleapis"

const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOLGE_SECRET,
})



auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

export const googleCalendar = async (date: string, time: string, end: string, email: string) => {

    const calendar = google.calendar({ version: 'v3', auth })
    try {

        return await calendar.events.insert({
            calendarId: "primary",
            requestBody: {

                summary: "Physio Therapy Appointment",
                start: {
                    dateTime: `${new Date(date).toISOString().slice(0, 10)}T${time}:00.000Z`,
                    timeZone: "PST/California"
                },
                end: {
                    dateTime: `${new Date(date).toISOString().slice(0, 10)}T${end}:00.000Z`,
                    timeZone: "PST/California"
                },
                recurrence: [
                    'RRULE:FREQ=DAILY;COUNT=1'
                ],
                status: "confirmed",
                attendees: [ {
                    email: email
                } ],

                reminders: {
                    useDefault: false,
                    overrides: [ { 'method': 'email', 'minutes': 24 * 60 }, { 'method': 'popup', 'minutes': 30 }, ]
                }
            }
        })

    } catch (error) {
        throw new Error(`Could not create event: ${(error as any).message}`);
    }
}




export const googleCalendarUpdate = async () => {
    const calendar = google.calendar({ version: 'v3', auth })

    try {
        return await calendar.events.update({

        })
    } catch (e) {

    }
}