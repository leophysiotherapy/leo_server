import { objectType } from "nexus";


export const OTPObject = objectType({
    name: "OTP",
    definition(t) {
        t.id("otpID");
        t.string("otp");
        t.datetime("expiredAt");
        t.datetime("createdAt");
    },
})