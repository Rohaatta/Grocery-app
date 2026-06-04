import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
const products = await mongoose.connection.db.collection('products').find({'image.0': {$exists: true}}).toArray();
products.forEach(x => console.log(x.name, ':', x.image[0]));
await mongoose.disconnect();
process.exit();
