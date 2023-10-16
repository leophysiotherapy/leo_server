import { objectType } from "nexus";
import { prisma } from "../../../../util/index.js";


export const BlogObject = objectType({
    name: "blog",
    definition(t) {
        t.id("blogsID");
        t.string("title");
        t.string('content');
        t.string("image");
        t.string("expertise");
        t.datetime("createdAt");
        t.datetime("updatedAt");
        t.list.field("author", {
            type: "user",
            resolve: async ({ blogsID }): Promise<any> => {
                return await prisma.user.findMany({
                    where: {
                        blog: {
                            some: {
                                blogsID
                            }
                        }
                    }
                })
            }
        })
    },
})