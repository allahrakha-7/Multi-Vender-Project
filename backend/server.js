import { app } from './app.js';
import mongoose from 'mongoose';


process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
  process.exit(1);
});

mongoose.connect(process.env.MONGO)
  .then(() => console.log(`Connected to MongoDB!`))
  .catch((err) => console.log(err));


const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}`
  );
});


process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);
  
  server.close(() => {
    process.exit(1);
  });
});