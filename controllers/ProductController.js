import Product from '../models/Product.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

const index = async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' });
    if (!products) {
      throw { code: 500, message: 'GET_PRODUCT_FAILED' };
    }
    return res.status(200).json({
      status: true,
      total: products.length,
      products,
    });
  } catch (err) {
    return res.status(err.code || 500).json({
      status: false,
      message: err.message,
    });
  }
};

const store = async (req, res) => {
  try {
    if (!req.body.title) {
      throw { code: 428, message: 'TITLE_REQUIRED' };
    }
    if (!req.body.thumbnail) {
      throw { code: 428, message: 'THUMBNAIL_REQUIRED' };
    }
    if (!req.body.price) {
      throw { code: 428, message: 'PRICE_REQUIRED' };
    }
    if (!req.body.categoryId) {
      throw { code: 428, message: 'CATEGORYID_REQUIRED' };
    }

    const productExist = await Product.findOne({ title: req.body.title });
    if (productExist) {
      throw { code: 428, message: 'PRODUCT_EXIST' };
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(req.body.categoryId);
    if (!isObjectId) {
      throw { code: 500, message: 'CATEGORYID_INVALID' };
    }

    const categoryExist = await Category.findOne({ _id: req.body.categoryId });
    if (!categoryExist) {
      throw { code: 428, message: 'CATEGORYID_NOT_EXIST' };
    }

    const newProduct = new Product({
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      price: req.body.price,
      categoryId: req.body.categoryId,
    });

    const product = await newProduct.save();

    if (!product) {
      throw { code: 500, message: 'STORE_PRODUCT_FAILED' };
    }

    return res.status(200).json({
      status: true,
      product,
    });
  } catch (err) {
    return res.status(err.code || 500).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
