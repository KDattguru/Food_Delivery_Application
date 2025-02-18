import foodModel from "../models/foodModel.js";
import fs from 'fs/promises'; 
import path from 'path';

// Add Food Item
const addFood = async (req, res) => {
  let image_filename = req.file ? `${req.file.filename}` : null;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error while adding food:", error);
    res.status(500).json({ success: false, message: "Error occurred while adding food" });
  }
};

// Get All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find(); // Find all food items
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error while fetching food list:", error);
    res.status(500).json({ success: false, message: "Error occurred while fetching food list" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Check if the image exists before deleting
    if (food.image) {
      const imagePath = path.join('uploads', food.image);
      try {
        await fs.unlink(imagePath);
      } catch (fsError) {
        console.error(`Error while deleting image file: ${imagePath}`, fsError);
      }
    }

    // Delete food item from the database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error while removing food:", error);
    res.status(500).json({ success: false, message: "Error occurred while removing food" });
  }
};

export { addFood, listFood, removeFood };

