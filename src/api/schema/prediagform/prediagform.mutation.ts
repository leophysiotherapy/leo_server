import { extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma } from "../../../util/index.js";

export const preDiagInput = inputObjectType({
    name: "prediaginput",
    definition(t) {
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
    },
})

export const preDiagMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field('createPreDiagForm', {
            type: "prediagform",
            args: { userID: nonNull(idArg()), prediag: "prediaginput", },
            resolve: async (_, { userID, prediag: { age, date, question1, question2, question3, question4, question5, question6, question7, question8, sex, time, question10, question11, question12, question13, question14, question15, question16, question9, question17 } }): Promise<any> => {
                return await prisma.prediag.create({
                    data: {
                        age, date, question1, question2, question3, question4, question5, question6, question7, question8, sex, time,
                        question10, question11, question12, question13, question14, question15, question16, question9, question17,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("deletePreDiagForm", {
            type: "prediagform",
            args: { prediagnosticID: nonNull(idArg()) },
            resolve: async (_, { prediagnosticID }): Promise<any> => {
                return await prisma.prediag.delete({
                    where: { prediagnosticID }
                })
            }
        })
    },
})