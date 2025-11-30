import "dotenv/config";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import Listings from "./models/listing.js";
import Listing from "./models/listing.js";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(import.meta.dirname, "/public")));

app.engine("ejs", ejsMate);

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

// NEW route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// SHOW route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listings.findById(id);
  res.render("./listings/show.ejs", { listing });
});

// CREATE route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//EDIT route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

//UPDATE route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//DELETE route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
