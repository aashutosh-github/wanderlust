import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(res => console.log(`connected to wanderlust`))
  .catch(err => console.error(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("listening here buddy");
});

app.listen(port, () => {
  console.log(`Listening at port no. ${port}`);
});
