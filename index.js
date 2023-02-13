import Express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UsersRoutes from "./routes/UsersRoutes.js";

const app = Express();
dotenv.config();

app.use(Express.json());

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/users", UsersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
