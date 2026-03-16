import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import path from "path";

import { connectMongo } from "./MongoDB/connect";
import indexRoutes from "./routes/index.routes";

dotenv.config();

const app = express();

/* ================= middleware ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= view engine ================= */

app.set("view engine", "ejs");

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.set("views", path.join(__dirname, "views"));

/* ================= routes ================= */

app.get("/", (req, res) => {
	res.json({
		message: "Server & API đang chạy",
	});
});

/* API ROUTES */

app.use("/api", indexRoutes);

/* ================= start server ================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	try {
		console.log(chalk.blue("\n⏳ Đang khởi động server...\n"));

		/* connect database */
		await connectMongo();

		console.log(chalk.green("✔ MongoDB connected"));

		app.listen(PORT, () => {
			console.log("\n=====================================");
			console.log(chalk.green.bold("🚀 WebLamGom Server Started"));
			console.log("=====================================");

			console.log(chalk.cyan("🌐 URL:"), `http://localhost:${PORT}`);
			console.log(chalk.cyan("📦 API Root:"), `http://localhost:${PORT}/api`);
			console.log(chalk.cyan("📚 API Docs:"), `http://localhost:${PORT}/api`);
			console.log(chalk.cyan("🛢 Database:"), "MongoDB connected");

			console.log("=====================================\n");
		});
	} catch (error) {
		console.error(chalk.red("❌ Server start error"));
		console.error(error);

		process.exit(1);
	}
};

startServer();
