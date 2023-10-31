import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../../../util/index.js";



export const BlogQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("getAllBlogsPost", {
            type: "blog",
            resolve: async (): Promise<any> => {
                return await prisma.blogs.findMany()
            }
        })
        t.list.field("getBlogsById", {
            type: "blog",
            args: { blogsID: nonNull(idArg()) },
            resolve: async (_, { blogsID }): Promise<any> => {
                return await prisma.blogs.findMany({
                    where: {
                        blogsID
                    }
                })
            }
        })
        t.list.field("getBlogSearch", {
            type: "blog",
            args: { search: nonNull(stringArg()) },
            resolve: async (_, { search }): Promise<any> => {
                return await prisma.blogs.findMany({
                    where: {
                        title: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                })
            }
        })
    },
})