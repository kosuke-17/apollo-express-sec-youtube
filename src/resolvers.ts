import { Post } from "./models/Post.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAll: async () => {
      return await Post.find();
    },
  },
  Mutation: {
    createPost: async (
      parent: any,
      args: { post: { title: any; description: any } },
      context: any,
      info: any
    ) => {
      const { title, description } = args.post;
      return await new Post({ title, description }).save();
    },
    updatePost: async (
      parent: any,
      args: { post: { title: string; description: string }; id: string },
      context: any,
      info: any
    ) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = { title: "", description: "" };
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      return await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
    },
  },
};
