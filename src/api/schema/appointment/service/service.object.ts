import { objectType } from "nexus";



export const serviceObject = objectType({
    name: "service",
    definition(t) {
        t.id("serviceID");
        t.string("service");
        t.string("description");
        t.float("price");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})