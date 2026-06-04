import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected ✅");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  offerPrice: Number,
  description: [String],
  image: [String],
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

const products = [
  { name: "Potato 500g", category: "Vegetables", price: 25, offerPrice: 20, description: ["Fresh and organic", "Rich in carbohydrates", "Ideal for curries and fries"], image: [] },
  { name: "Tomato 1 kg", category: "Vegetables", price: 40, offerPrice: 35, description: ["Juicy and ripe", "Rich in Vitamin C", "Perfect for salads"], image: [] },
  { name: "Carrot 500g", category: "Vegetables", price: 30, offerPrice: 28, description: ["Sweet and crunchy", "Good for eyesight", "Ideal for juices"], image: [] },
  { name: "Spinach 500g", category: "Vegetables", price: 18, offerPrice: 15, description: ["Rich in iron", "High in vitamins", "Perfect for soups"], image: [] },
  { name: "Onion 500g", category: "Vegetables", price: 22, offerPrice: 19, description: ["Fresh and pungent", "Perfect for cooking", "A kitchen staple"], image: [] },
  { name: "Apple 1 kg", category: "Fruits", price: 120, offerPrice: 110, description: ["Crisp and juicy", "Rich in fiber", "Boosts immunity"], image: [] },
  { name: "Orange 1 kg", category: "Fruits", price: 80, offerPrice: 75, description: ["Juicy and sweet", "Rich in Vitamin C", "Perfect for juices"], image: [] },
  { name: "Banana 1 kg", category: "Fruits", price: 50, offerPrice: 45, description: ["Sweet and ripe", "High in potassium", "Great for smoothies"], image: [] },
  { name: "Mango 1 kg", category: "Fruits", price: 150, offerPrice: 140, description: ["Sweet and flavorful", "Perfect for smoothies", "Rich in Vitamin A"], image: [] },
  { name: "Grapes 500g", category: "Fruits", price: 70, offerPrice: 65, description: ["Fresh and juicy", "Rich in antioxidants", "Perfect for snacking"], image: [] },
  { name: "Amul Milk 1L", category: "Dairy", price: 60, offerPrice: 55, description: ["Pure and fresh", "Rich in calcium", "Trusted brand quality"], image: [] },
  { name: "Paneer 200g", category: "Dairy", price: 90, offerPrice: 85, description: ["Soft and fresh", "Rich in protein", "Ideal for curries"], image: [] },
  { name: "Eggs 12 pcs", category: "Dairy", price: 90, offerPrice: 85, description: ["Farm fresh", "Rich in protein", "Ideal for breakfast"], image: [] },
  { name: "Cheese 200g", category: "Dairy", price: 140, offerPrice: 130, description: ["Creamy and delicious", "Perfect for pizzas", "Rich in calcium"], image: [] },
  { name: "Coca-Cola 1.5L", category: "Drinks", price: 80, offerPrice: 75, description: ["Refreshing and fizzy", "Perfect for parties", "Best served chilled"], image: [] },
  { name: "Pepsi 1.5L", category: "Drinks", price: 78, offerPrice: 73, description: ["Chilled and refreshing", "Perfect for celebrations", "Best served cold"], image: [] },
  { name: "Sprite 1.5L", category: "Drinks", price: 79, offerPrice: 74, description: ["Refreshing citrus taste", "Perfect for hot days", "Best served chilled"], image: [] },
  { name: "Fanta 1.5L", category: "Drinks", price: 77, offerPrice: 72, description: ["Sweet and fizzy", "Great for parties", "Best served cold"], image: [] },
  { name: "7 Up 1.5L", category: "Drinks", price: 76, offerPrice: 71, description: ["Refreshing lemon-lime flavor", "Best served chilled"], image: [] },
  { name: "Basmati Rice 5kg", category: "Grains", price: 550, offerPrice: 520, description: ["Long grain and aromatic", "Perfect for biryani", "Premium quality"], image: [] },
  { name: "Wheat Flour 5kg", category: "Grains", price: 250, offerPrice: 230, description: ["High-quality whole wheat", "Soft and fluffy rotis", "Rich in nutrients"], image: [] },
  { name: "Organic Quinoa 500g", category: "Grains", price: 450, offerPrice: 420, description: ["High in protein and fiber", "Gluten-free", "Rich in vitamins"], image: [] },
  { name: "Brown Rice 1kg", category: "Grains", price: 120, offerPrice: 110, description: ["Whole grain and nutritious", "Helps in weight management"], image: [] },
  { name: "Barley 1kg", category: "Grains", price: 150, offerPrice: 140, description: ["Rich in fiber", "Helps improve digestion", "Low in fat"], image: [] },
  { name: "Brown Bread 400g", category: "Bakery", price: 40, offerPrice: 35, description: ["Soft and healthy", "Made from whole wheat", "Ideal for breakfast"], image: [] },
  { name: "Butter Croissant 100g", category: "Bakery", price: 50, offerPrice: 45, description: ["Flaky and buttery", "Freshly baked", "Perfect for breakfast"], image: [] },
  { name: "Chocolate Cake 500g", category: "Bakery", price: 350, offerPrice: 325, description: ["Rich and moist", "Made with premium cocoa", "Ideal for celebrations"], image: [] },
  { name: "Whole Bread 400g", category: "Bakery", price: 45, offerPrice: 40, description: ["Healthy and nutritious", "Made with whole wheat flour"], image: [] },
  { name: "Vanilla Muffins 6 pcs", category: "Bakery", price: 100, offerPrice: 90, description: ["Soft and fluffy", "Perfect for a quick snack", "Made with real vanilla"], image: [] },
  { name: "Maggi Noodles 280g", category: "Instant", price: 55, offerPrice: 50, description: ["Instant and easy to cook", "Delicious taste", "Popular among kids"], image: [] },
  { name: "Top Ramen 270g", category: "Instant", price: 45, offerPrice: 40, description: ["Quick and easy to prepare", "Spicy and flavorful", "Loved by families"], image: [] },
  { name: "Knorr Cup Soup 70g", category: "Instant", price: 35, offerPrice: 30, description: ["Convenient for on-the-go", "Healthy and nutritious"], image: [] },
  { name: "Yippee Noodles 260g", category: "Instant", price: 50, offerPrice: 45, description: ["Non-fried noodles", "Tasty and filling", "Convenient for busy schedules"], image: [] },
  { name: "Oats Noodles 72g", category: "Instant", price: 40, offerPrice: 35, description: ["Healthy alternative with oats", "Good for digestion", "Perfect for breakfast"], image: [] },
];

await Product.insertMany(products);
console.log("🎉 All 34 products added successfully!");

await mongoose.disconnect();
process.exit(0);