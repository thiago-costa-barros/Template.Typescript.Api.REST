import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/Routes";
import "tsconfig-paths/register";
import { errorHandler } from "./middlewares/ErrorHandlerMiddleware";

config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
