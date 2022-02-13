import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

dotenv.config();

async function StartApolloServer() {
  const app = express();
  const PORT = 4000 || process.env.PORT;
  const MONGO = process.env.MONGO_URI || "";

  app.use(cors());

  // インスタンス化
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  // 起動
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });
  app.use((req, res) => {
    res.send("初めてのApollo Server");
  });

  await mongoose
    .connect(MONGO)
    .then(() => console.log("MongoDB接続完了"))
    .catch((e) => console.log(e));

  app.listen(PORT, () => console.log(`ポート${PORT}番起動中`));
}

StartApolloServer();
