import { config } from "dotenv";
import express from "express";
import routes from "./routes/Routes";
import "tsconfig-paths/register";

config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
