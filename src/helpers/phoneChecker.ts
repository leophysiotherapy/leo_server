import { GraphQLError } from "graphql";
import { isValidNumber, formatNumber } from "libphonenumber-js";



export default function PhoneCheck(phone: string) {
    try {
        const parseNumber = formatNumber(phone, 'E.164')

        return isValidNumber(parseNumber)
    }

    catch {
        throw new GraphQLError("Please Enter a valid phone number: (country code) + (area code) + (local number) (+1xxxxxxxxxx)")
    }
}