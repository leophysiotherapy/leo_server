import { objectType } from "nexus";



export const NotificationObject = objectType({
    name: "notification",
    definition(t) {
        t.id("notificationID");
        t.string("title");
        t.string("status");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})