import Product from "../model/products.model.js";
import errorHandler from "../utils/errorHandler.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, tags, originalPrice, discountPrice, stock, images, shopId, shop, userRef, bestDeals, featuredProducts, } = req.body;
    if (!name || !description || !category || !discountPrice || !stock || images.length < 1) {
      return next(errorHandler(400, "All required fields must be provided"));
    }

    const newProduct = new Product({
      name,
      description,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      originalPrice: parseFloat(originalPrice),
      discountPrice: parseFloat(discountPrice),
      stock: parseInt(stock),
      images,
      shopId,
      shop,
      userRef,
      bestDeals,
      featuredProducts,
      ratings: 0,
      reviews: [],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ userRef: req.params.id }).sort({ createdAt: -1 });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No product found for this user!" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found!" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const currentUserId = req.user?._id;
  let query = {};

  if (currentUserId) {
    query.userRef = { $ne: currentUserId };
  }

  const products = await Product.find(query);
  res.status(200).json(products);
};

export const deleteProductCard = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found!"));
    res.status(200).json({ message: "Your product deleted successfully!" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const updateProductCard = async (req, res, next) => {
  const productCard = await Product.findById(req.params.id);

  if (!productCard) {
    return next(errorHandler(404, "Product not found!"));
  }

  if (req.user.id !== productCard.userRef) {
    return next(errorHandler(401, "You can only update your own products!"));
  }

  try {
    const updatedProductCard = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProductCard);
  } catch (error) {
    next(error);
  }
};


export const addReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user?._id;
    if (!rating || rating < 1 || rating > 5) {
      return next(errorHandler(400, "Rating must be between 1 and 5"));
    }

    const product = await Product.findById(productId);
    if (!product) return next(errorHandler(404, "Product not found!"));

    product.reviews.push({ comment, rating, userId });

    const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.ratings = product.reviews.length > 0 ? Number((totalRatings / product.reviews.length).toFixed(1)) : 0;

    await product.save();
    res.status(200).json({ message: "Review added successfully", product });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};