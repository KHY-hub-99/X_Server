import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { db } from "./db/database.mjs";

const app = express();
const port = config.host.port;
app.use(express.json());

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

db.getConnection().then((connection) => console.log(connection));
app.listen(port, () => {
  console.log(`${port} Port Serving...`);
});
