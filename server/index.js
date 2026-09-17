import cors from "cors";
import express from "express";
import { devicesRouter, employeesRouter } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

const apiRouter = express.Router();

apiRouter.use("/employees", employeesRouter);
apiRouter.use("/devices", devicesRouter);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
