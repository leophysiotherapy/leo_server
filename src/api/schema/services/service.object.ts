import { objectType } from "nexus";



export const ServiceObject = objectType({
    name: "services",
    definition(t) {
        t.id("servicesID");
        t.string("services");
        t.string("image");
        t.string("descriptions")
        t.int("price");
    },
})