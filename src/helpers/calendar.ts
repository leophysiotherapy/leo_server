import { google } from "googleapis"

const auth = new google.auth.OAuth2({
    clientId: process.env.GOOLE_ID,
    clientSecret: process.env.GOOLE_SECRET,
})



auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const googleCalendar = async (start: string, end: string, email: string) => {

    const calendar = google.calendar({ version: 'v3', auth })
    try {

        return await calendar.events.insert({
            requestBody: {
                summary: "Physio Theraphy Appointment",

                start: {
                    dateTime: new Date(start).toISOString(),
                    timeZone: "Asia/Manila"
                },
                end: {
                    dateTime: new Date(end).toISOString(),
                    timeZone: "Asia/Manila"
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


export default googleCalendar