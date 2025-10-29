import { Product } from "../models/product.Model.js";
import { ApiError } from "../utils/ApiError.js";

// Get all products (and reseed mock data)
export const getProducts = async (req, res) => {
  try {
    // Clear existing products before inserting new ones
    await Product.deleteMany({});

    // Mock product data
    const mockProducts = [
      { name: "Headphones", price: 7000, image: "https://media.tatacroma.com/Croma%20Assets/Communication/Headphones%20And%20Earphones/Images/319023_0_FBVNN-hQOV.png?updatedAt=1758793608627" },
      
      { name: "watch", price: 50000, image: "https://images-cdn.ubuy.co.in/675aff4a173f15487a51fe58-poedagar-luxury-automatic-mechanical.jpg" },

      { name: "Sneakers", price: 24000, image: "https://media.sivasdescalzo.com/media/catalog/product/C/Z/CZ0377-100_sivasdescalzo-Nike-WMNS_AIR_FORCE_1_07-1621936241-1.jpg?width=1440&q=72&optimize=high&format=auto" },

      { name: "Keyboard", price: 12000, image: "https://img.freepik.com/premium-photo/white-keyboard-white-background_204719-17996.jpg" },


      { name: "Laptop Bag", price: 4000, image: "https://assemblytravel.com/cdn/shop/files/messenger45_43d07058-ec3c-4fcb-a056-36e6c93b97f3.jpg?v=1722944810&width=2048" },


      { name: "Gaming Mouse", price: 3000, image: "https://static.gamesmen.com.au/media/catalog/product/cache/57ddbad6affa8d28869fa47188b75842/l/o/logitech_g502_x_wired_gaming_mouse_white_1_.jpg" },


      { name: "PS5", price: 45999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Booezz8nVQvCECzIXizgnBYoLEE6EaBH1FT_bmmR-wn2U3AXxzFHzBPJdTO2KQ75uGA&usqp=CAU" },


      { name: "Anime figure", price: 150000, image: "https://bearhugs.in/cdn/shop/files/buy-naruto-uchiha-madara-action-figure-28-cm-at-bear-hugs-15384.webp?v=1758888673" },
    ];

    //  Insert mock data into DB
    await Product.insertMany(mockProducts);

    // Fetch all products from DB
    const products = await Product.find();

    // Send response to frontend
    res.status(200).json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    throw new ApiError(500, "Error while fetching products");
  }
};
