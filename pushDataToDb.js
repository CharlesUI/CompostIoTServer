const ProductModel = require('./model/Product'); // Adjust the path as needed

const addProductsToDatabase = async (products) => {
  try {
    await ProductModel.insertMany(products);
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products:', error);
  }
};

addProductsToDatabase(products);
