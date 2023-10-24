import { GraphQLError } from "graphql";
import { isValidNumber, formatNumber } from "libphonenumber-js";



export default function PhoneCheck(phone: string) {
    try {
        const parseNumber = formatNumber(phone, 'E.164')

        return isValidNumber(parseNumber)
    }

    catch {
        throw new GraphQLError("Phone number is not valid of the form +17895551234 (7-15 digits);")
        return false
    }
}