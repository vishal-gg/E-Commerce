const Product = require("../models/products");
const User = require("../models/user");

// add products to user's cart
const addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId)
      throw new Error("product and user Id is required");

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("no product found while adding product to cart");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("no user found while adding product to cart");
    }

    user.cart.push({ product: product._id, quantity: 1 });
    await user.save();

    res.status(200).json({ message: "successfull", cart: user.cart });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// populate cart items
const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cart.product"
    );

    if (!user) throw new Error("User not found");

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    if (!productId || !userId || !quantity) {
      throw new Error("Product ID, User ID, and Quantity are required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const cartItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );

    if (!cartItem) {
      throw new Error("Product not found in user's cart");
    }

    // Update the quantity for the product
    cartItem.quantity = quantity;

    await user.save();

    res
      .status(200)
      .json({ message: "Product quantity updated successfully in the cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const syncCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) throw new Error("User not found");

    for (let incomingItem of cartItems) {
      const existingItem = user.cart.find(
        (item) => item.product._id.toString() === incomingItem.product._id
      );

      if (existingItem) {
        existingItem.quantity += incomingItem.quantity;
      } else {
        user.cart.push(incomingItem);
      }
    }

    await user.save();

    res.status(200).json({ message: "Cart synchronized successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      throw new Error("Product ID and User ID are required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (cartItemIndex === -1) {
      throw new Error("Product not found in user's cart");
    }

    // Remove the product from the user's cart
    user.cart.splice(cartItemIndex, 1);

    await user.save();

    res
      .status(200)
      .json({ message: "Product removed successfully from the cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Remove all products from the user's cart
    user.cart = [];

    await user.save();

    res
      .status(200)
      .json({ message: "All products removed successfully from the cart" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  addToCart,
  getCartItems,
  updateProductQuantity,
  syncCart,
  removeFromCart,
  removeAllFromCart
};
