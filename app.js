import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

main()
  .then(res => console.log(`connected to wanderlust DB`))
  .catch(err => console.error(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
  console.log(`Listening at port no. ${port}`);
});
