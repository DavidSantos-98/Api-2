import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routers/usersRouter.js";
import productsRouter from "./routers/productsRouter.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", usersRouter);
app.use("/api", productsRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
