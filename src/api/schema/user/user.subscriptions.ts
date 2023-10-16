import { subscriptionField } from "nexus";
import { pubsub } from "../../../util/index.js";



export const UserSubscriptions = subscriptionField("UserSubscriptions", {
    type: "user",
    args: { role: "roles" },
    subscribe: async (): Promise<any> => {
       return await pubsub.asyncIterator("createUserAccount")
    },
    resolve: async (payload): Promise<any> => {
        return payload
    }
})