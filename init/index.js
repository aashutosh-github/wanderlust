import "dotenv/config";
import mongoose from "mongoose";
import sampleListings from "./data";
import Listing from "../models/listing.js";

main()
  .then(res => console.log(`Success`))
  .catch(err => console.error(`Error occurred: ${err}`));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(sampleListings);
};

initDB()
  .then(() => console.log(`DB has been initialized!`))
  .catch(err => console.error(`Error occurred: ${err}`));
