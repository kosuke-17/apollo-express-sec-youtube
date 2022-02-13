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
  },
};
