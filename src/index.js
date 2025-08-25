import dotenv from "dotenv";
import pool from "./db/index.js";
import app from "./app.js";

dotenv.config();

pool.connect().then(() => {
    app.on("error", (err) => {
        console.error("Server error:", err);
        throw err;
    })
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    })
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection failed", err);
});

