import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected ✅");

const clientAssetsPath = path.join(__dirname, "../client/src/assets");

const imageMap = {
  "Potato 500g": "potato_image_1.png",
  "Tomato 1 kg": "tomato_image.png",
  "Carrot 500g": "carrot_image.png",
  "Spinach 500g": "spinach_image_1.png",
  "Onion 500g": "onion_image_1.png",
  "Apple 1 kg": "apple_image.png",
  "Orange 1 kg": "orange_image.png",
  "Banana 1 kg": "banana_image_1.png",
  "Mango 1 kg": "mango_image_1.png",
  "Grapes 500g": "grapes_image_1.png",
  "Amul Milk 1L": "amul_milk_image.png",
  "Paneer 200g": "paneer_image.png",
  "Eggs 12 pcs": "eggs_image.png",
  "Cheese 200g": "cheese_image.png",
  "Coca-Cola 1.5L": "coca_cola_image.png",
  "Pepsi 1.5L": "pepsi_image.png",
  "Sprite 1.5L": "sprite_image_1.png",
  "Fanta 1.5L": "fanta_image_1.png",
  "7 Up 1.5L": "seven_up_image_1.png",
  "Basmati Rice 5kg": "basmati_rice_image.png",
  "Wheat Flour 5kg": "wheat_flour_image.png",
  "Organic Quinoa 500g": "quinoa_image.png",
  "Brown Rice 1kg": "brown_rice_image.png",
  "Barley 1kg": "barley_image.png",
  "Brown Bread 400g": "brown_bread_image.png",
  "Butter Croissant 100g": "butter_croissant_image.png",
  "Chocolate Cake 500g": "chocolate_cake_image.png",
  "Whole Bread 400g": "whole_wheat_bread_image.png",
  "Vanilla Muffins 6 pcs": "vanilla_muffins_image.png",
  "Maggi Noodles 280g": "maggi_image.png",
  "Top Ramen 270g": "top_ramen_image.png",
  "Knorr Cup Soup 70g": "knorr_soup_image.png",
  "Yippee Noodles 260g": "yippee_image.png",
  "Oats Noodles 72g": "maggi_oats_image.png",
};

const db = mongoose.connection.db;
const products = await db.collection('products').find({}).toArray();
console.log(`Total: ${products.length}`);

for (const product of products) {
  const imgFile = imageMap[product.name];
  if (!imgFile) continue;

  const imgPath = path.join(clientAssetsPath, imgFile);
  if (!fs.existsSync(imgPath)) {
    console.log(`❌ Not found: ${imgFile}`);
    continue;
  }

  const result = await cloudinary.uploader.upload(imgPath, {
    folder: "greencart-products",
  });

  await db.collection('products').updateOne(
    { _id: product._id },
    { $set: { image: [result.secure_url] } }
  );
  console.log(`✅ ${product.name}`);
}

console.log("🎉 Done!");
await mongoose.disconnect();
process.exit(0);