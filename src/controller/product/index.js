import productModel from "../../model/sale/product.js";
// import salesModel from "../../model/sale/index.js";
// import saleProductModel from "../../model/sale/salesProduct.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await productModel.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  getId: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },

  // Add a new product
  addProduct: async (req, res) => {
    try {
      const { productName, productStock, productRate } = req.body;

      if (!productName || !productStock || !productRate) {
        return res
          .status(404)
          .json({ message: "product name, rate and stock are required" });
      }

      const existProduct = await productModel.findOne({
        where: { name: productName },
      });
      if (existProduct) {
        return res
          .status(400)
          .json({ message: "A product with this name is already exist" });
      }

      const product = await productModel.create({
        name: productName,
        stock: productStock,
        rate: productRate,
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product", error });
    }
  },

  update: async (req, res) => {
    try {
      const { productRate, productStock } = req.body;
      const { id } = req.params;
  
      const product = await productModel.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const newStock = product.stock + parseInt(productStock, 10);
  
      const [updatedRowCount] = await productModel.update(
        { rate: productRate, stock: newStock },
        { where: { id } }
      );
  
      if (updatedRowCount > 0) {
        const updatedProduct = await productModel.findByPk(id);
        return res.status(200).json(updatedProduct);
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to update product", error });
    }
  },
    

  deleted: async (req, res) => {
    try {
      const deleted = await productModel.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },

  updatePrice: async (req, res) => {
    try {
      const [updated] = await productModel.update(
        { productRate: req.body.productRate },
        { where: { id: req.params.id } }
      );
      if (updated) {
        const updatedProduct = await productModel.findByPk(req.params.id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update product price" });
    }
  },
};

export default productController;
