import { objectType } from "nexus";
import { prisma } from "../../../util/index.js";


export const PreDiagObject = objectType({
    name: "prediagform",
    definition(t) {
        t.id("prediagnosticID");
        t.string("age");
        t.string("sex");
        t.string("date");
        t.string("time");
        t.string("question1");
        t.string("question2");
        t.string("question3");
        t.string("question4");
        t.string("question5");
        t.string("question6");
        t.string("question7");
        t.string("question8");
        t.string("question9");
        t.string("question10");
        t.string("question11");
        t.string("question12");
        t.string("question13");
        t.string("question14");
        t.string("question15");
        t.string("question16");
        t.string("question17");
        t.datetime('createdAt');
        t.datetime("updatedAt")
        t.list.field("user", {
            type: "user",
            resolve: async ({ prediagnosticID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        preDiagnostic: {
                            some: {
                                prediagnosticID
                            }
                        }
                    }
                })
            }
        })

    },
})