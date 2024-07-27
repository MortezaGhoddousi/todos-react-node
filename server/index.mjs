import express from "express";
import morgan from "morgan";
import cors from "cors";
import { apiRouts } from "./routs/api-routs.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

apiRouts(app);

const port = 8000;
app.listen(port, () => {
    console.log(`now listening to requests on port ${port}`);
});
