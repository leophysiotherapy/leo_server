import { objectType } from "nexus";



export const EquipmentObject = objectType({
    name: "equipment",
    definition(t) {
        t.id("equipmentID");
        t.string("name");
        t.string("description");
        t.int("quantity");
        t.datetime("expireDate");
    },
})


export const equipemntExpiration = objectType({
    name: "EquipmentExpiration",
    definition(t) {
        t.int("count");
    },
})