import "dotenv/config";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import Listings from "./models/listing.js";

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

main()
  .then(res => console.log(`connected to wanderlust DB`))
  .catch(err => console.error(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
  console.log(`Listening at port no. ${port}`);
});

// INDEX route
app.get("/listings", async (req, res) => {
  const allListings = await Listings.find();
  res.render("./listings/index.ejs", { allListings });
});
