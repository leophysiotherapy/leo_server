import { subscriptionField } from "nexus";
import { pubsub } from "../../../util/index.js";



export const PreDiagForm = subscriptionField("PreDiagnosticSubscriptions", {
    type: "prediagform",
    subscribe: async (): Promise<any> => {
        return pubsub.asyncIterator("createPreDiagForm")
    },
    resolve: async (payload): Promise<any> => {
        return payload
    }
})