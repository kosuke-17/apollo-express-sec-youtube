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
};
