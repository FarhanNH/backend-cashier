import product from '../models/Product.js';

const index = async (req, res) => {
  //   try {
  //     const categories = await product.find();
  //     if (!categories) {
  //       throw { code: 500, message: 'Get Product Failed' };
  //     }
  //     return res.status(200).json({
  //       status: true,
  //       total: categories.length,
  //       categories,
  //     });
  //   } catch (err) {
  //     return res.status(err.code).json({
  //       status: false,
  //       message: err.message,
  //     });
  //   }
};

const store = async (req, res) => {
  try {
    // if (!req.body.title) {
    //   throw { code: 428, message: 'Title is required' };
    // }

    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const price = req.body.price;
    const categoryId = req.body.categoryId;

    const newProduct = new product({
      title: title,
      thumbnail: thumbnail,
      price: price,
      categoryId: categoryId,
    });

    const Product = await newProduct.save();

    if (!Product) {
      throw { code: 500, message: 'Strore product failed' };
    }

    return res.status(200).json({
      status: true,
      Product,
    });
  } catch (err) {
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { index, store };
