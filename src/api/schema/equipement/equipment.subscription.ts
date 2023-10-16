import { pubsub } from "../../../util/index.js";
import { subscriptionField } from "nexus";



export const InventorySubscriptions = subscriptionField("InventorySubscriptions", {
    type: "equipment",
    args: { inventory: "inventory" },
    subscribe: async (): Promise<any> => {
        return await pubsub.asyncIterator("createInventory")
    },
    resolve: async (payload): Promise<any> => {
        return payload
    }
})