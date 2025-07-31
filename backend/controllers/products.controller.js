import Product from "../model/products.model.js";
import errorHandler from "../utils/errorHandler.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, tags, originalPrice, discountPrice, stock, images, shopId, shop, userRef } = req.body;

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
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const deleteProductCard = async (req, res, next) => {
    const productCard = await Product.findById(req.params.id);

    if (!productCard) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== productCard.userRef) {
        return next(errorHandler(401, 'You can only delete your own products!'));
    }

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Your product has been deleted!');
    } catch (error) {
        next(error);
    }
}


export const updateProductCard = async (req, res, next) => {
    const productCard = await Product.findById(req.params.id);

    if (!productCard) {
        return next(errorHandler(404, 'Product not found!'));
    }

    if (req.user.id !== productCard.userRef) {
        return next(errorHandler(401, 'You can only remove your own products!'));
    }

    try {
        const updatedProductCard = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedProductCard);
    } catch (error) {
        next(error);
    }
}