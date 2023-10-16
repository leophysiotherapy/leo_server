import { subscriptionField } from "nexus";
import { pubsub } from "../../../util/index.js";


export const FAQSSubscriptions = subscriptionField("FAQsSubscriptions", {
    type: "faqs",
    resolve: async (payload): Promise<any> => {
        return await payload
    },
    subscribe: async (): Promise<any> => {
        return await pubsub.asyncIterator("createFAQs")
    }
})