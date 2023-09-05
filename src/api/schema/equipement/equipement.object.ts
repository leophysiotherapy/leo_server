import { objectType } from "nexus";



export const EquipmentObject = objectType({
    name: "equipment",
    definition(t) {
        t.id("equipmentID");
        t.string("name");
        t.string("description");
        t.string("category");
        t.int("quantity");
        t.datetime("expiredDate");
    },
})