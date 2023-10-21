import { extendType, nonNull, stringArg } from "nexus";
import { TextClient } from "../../../helpers/twillio.js";




export const SMSMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createSMSNotification", {
            type: "Boolean",
            args: { phoneNumber: nonNull("PhoneNumber") },
            resolve: async (_, { phoneNumber }): Promise<boolean> => {
                TextClient(phoneNumber)
                return true
            }
        })
    },

})