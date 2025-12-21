import app from "./src/app.js";
import http from "http";
import { exec } from "child_process";

// Force server port to 5000 for all environments to avoid conflicts
process.env.PORT = "5000";
const PORT = 5000;

const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} in use — attempting to free it automatically...`);
    const cmd = `netstat -ano | findstr :${PORT}`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("Failed to run netstat:", error);
        process.exit(1);
      }
      const lines = stdout.trim().split(/\r?\n/).filter(Boolean);
      if (lines.length === 0) {
        console.error(`No process found using port ${PORT}.`);
        process.exit(1);
      }
      // Parse PID from first matching line (last column)
      const parts = lines[0].trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (!pid) {
        console.error("Could not parse PID from netstat output:", lines[0]);
        process.exit(1);
      }
      console.log(`Killing process ${pid} using port ${PORT}...`);
      exec(`taskkill /PID ${pid} /F`, (killErr, killOut, killErrOut) => {
        if (killErr) {
          console.error(`Failed to kill PID ${pid}:`, killErr);
          process.exit(1);
        }
        console.log(`Process ${pid} killed. Retrying to bind to port ${PORT}...`);
        setTimeout(() => startServer(), 500);
      });
    });
  } else {
    throw err;
  }
});

startServer();
