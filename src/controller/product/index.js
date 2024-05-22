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

      if (!productName || !productStock || !productRate)
        res
          .status(404)
          .json({ message: "product name, rate and stock are required" });

      const product = new productModel({
        productName,
        productStock,
        productRate,
      });

      const saveProduct = await product.save();

      res.status(201).json(saveProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product", error });
    }
  },

  update: async (req, res) => {
    try {
      const [updated] = await productModel.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedProduct = await productModel.findByPk(req.params.id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
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
