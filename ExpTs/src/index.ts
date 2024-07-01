import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const LOG_FOLDER = process.env.LOG_FOLDER || "./logs";
const LOG_FORMAT = process.env.LOG_FORMAT || "simple";

// Cria a pasta de logs, se não existir
if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER, { recursive: true });
}

// Middleware para logging
const logMiddleware = (format: string) => (req: Request, res: Response, next: NextFunction) => {
  const logData = {
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method,
    httpVersion: req.httpVersion,
    userAgent: req.get("User-Agent") || ""
  };

  let logMessage: string;
  if (format === "complete") {
    logMessage = `${logData.timestamp} ${logData.method} ${logData.url} ${logData.httpVersion} ${logData.userAgent}`;
  } else {
    logMessage = `${logData.timestamp} ${logData.method} ${logData.url}`;
  }

  const logFilePath = path.join(LOG_FOLDER, `${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFile(logFilePath, logMessage + '\n', (err) => {
    if (err) {
      console.error("Erro ao salvar o log:", err);
    }
  });

  next();
};

app.use(logMiddleware(LOG_FORMAT));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
