import { objectType } from "nexus";


export const FAQsObject = objectType({
    name: "faqs",
    definition(t) {
        t.id("faqsID");
        t.string("faqs");
        t.string("answer");
        t.datetime("createdAt");
        t.datetime("updatedAt");
    },
})