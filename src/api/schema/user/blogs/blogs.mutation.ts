import { booleanArg, extendType, idArg, inputObjectType, nonNull } from "nexus";
import { prisma } from "../../../../util/index.js";
import { ImageUpload } from "../../../../helpers/aws.js";
import { GraphQLError } from "graphql";


export const blogInput = inputObjectType({
    name: "blogInput",
    definition(t) {
        t.string("title");
        t.string("content");
        t.string("expertise");
        t.upload("file");
    },
})
export const BlogMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createBlogPost", {
            type: "blog",
            args: { blog: "blogInput", userID: nonNull(idArg()) },
            resolve: async (_, { blog: { title, content, file, expertise }, userID }): Promise<any> => {


                if (!title) throw new GraphQLError("Title is required")
                if (!content) throw new GraphQLError("Content is required")

                if (!file) throw new GraphQLError("Please insert an Image.")

                const { createReadStream, filename } = await file;


                return await prisma.blogs.create({
                    data: {
                        title, content,
                        image: `${await ImageUpload(filename, createReadStream)}`,
                        expertise,
                        user: {
                            connect: {
                                userID
                            }
                        }
                    }
                })
            }
        })
        t.field("updateBlogsPost", {
            type: "blog",
            args: { blogsID: nonNull(idArg()), blog: "blogInput" },
            resolve: async (_, { blogsID, blog: { title, content, expertise, file } }): Promise<any> => {

                if (!title) throw new GraphQLError("Title is required")
                if (!content) throw new GraphQLError("Content is required")


                if (!file) {
                    return await prisma.blogs.update({
                        data: {
                            title, content, expertise,
                            updatedAt: new Date(Date.now())
                        },
                        where: {
                            blogsID
                        }
                    })
                } else {
                    const { createReadStream, filename } = await file;
                    return await prisma.blogs.update({
                        data: {
                            title, content, expertise,
                            image: await ImageUpload(filename, createReadStream),
                            updatedAt: new Date(Date.now())
                        },
                        where: {
                            blogsID
                        }
                    })
                }
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