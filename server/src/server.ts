import app from './app';
import prisma from "./prisma/client";

const PORT = process.env.PORT || 5000;

// Start the HTTP Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log('\nShutting down server...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Database disconnected. Process exited.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);