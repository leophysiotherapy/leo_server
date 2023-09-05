import { booleanArg, extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma } from "../../../../util/index.js";


export const blogInput = inputObjectType({
    name: "blogInput",
    definition(t) {
        t.string("title");
        t.string("content");

    },
})
export const BlogMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createBlogPost", {
            type: "blog",
            args: { blog: "blogInput", userID: nonNull(idArg()) },
            resolve: async (_, { blog: { title, content }, userID }): Promise<any> => {
                return await prisma.blogs.create({
                    data: {
                        title, content, user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("updateBlogDraft", {
            type: "blog",
            args: { blogsID: nonNull(idArg()), draft: nonNull(booleanArg()) },
            resolve: async (_, { blogsID, draft }): Promise<any> => {
                return await prisma.blogs.update({
                    where: { blogsID },
                    data: { draft }
                })
            }
        })
        t.field("updateBlogsPost", {
            type: "blog",
            args: { blogsID: nonNull(idArg()), blog: "blogInput" },
            resolve: async (_, { blogsID, blog: { title, content } }): Promise<any> => {
                return await prisma.blogs.update({
                    data: {
                        title, content,
                        updatedAt: new Date(Date.now())
                    },
                    where: {
                        blogsID
                    }
                })
            }
        })
        t.field("deleteBlogPost", {
            type: "blog",
            args: { blogsID: nonNull(idArg()) },
            resolve: async (_, { blogsID }): Promise<any> => {
                return await prisma.blogs.delete({
                    where: {
                        blogsID
                    }
                })
            }
        })
    },
})