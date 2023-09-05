import { objectType } from "nexus";



export const AvatarObject = objectType({
    name: "avatar",
    definition(t) {
        t.id("avatarID");
        t.string("avatar");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})