import salesModel from "../../model/sale/index.js";
import saleProductModel from "../../model/sale/salesProduct.js";
import productModel from "../../model/sale/product.js";

const salesController = {
  getAll: async (req, res) => {
    try {
      const allSales = await salesModel.findAll({
        order: [["createdAt", "DESC"]],
        limit: 10,
      });
      res.json({
        allSales: { Sales: allSales },
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: saleProductModel,
            include: [
              {
                productModel,
              },
            ],
          },
        ],
      });
      if (!sale) {
        res.status(404).json({ message: "No sale for this product" });
        return;
      }
      res.status(200).json({ data: sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  findSalesByBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const sales = await salesModel.findAll({
        include: [
          {
            model: saleProductModel,
            where: { bookId: bookId },
          },
        ],
      });
      if (sales.length === 0) {
        res.status(404).json({ message: "No sales found for this id" });
      }

      res.status(200).json({ sales });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  create: async (req, res) => {
    try {
      const { salesProducts } = req.body;

      let totalAmount = 0;
      const saleProducts = [];

      for (const { ProductId, rate, productQuantity } of salesProducts) {
        const product = await productModel.findByPk(ProductId);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product with id ${ProductId} not found` });
        }

        // const sale = new salesModel();

        if (productQuantity > product.stock) {
          return res.status(400).json({
            message: "Insufficient stock for this product",
          });
        }
        totalAmount += rate * productQuantity;
        saleProducts.push({
          productId: ProductId,
          productQuantity,
          productRate: rate,
        });

        await product.update({ stock: product.stock - productQuantity });
      }

      const sale = await salesModel.create({ totalAmount });

      for (const saleProduct of saleProducts) {
        saleProduct.saleId = sale.id;
      }

      await saleProductModel.bulkCreate(saleProducts);

      res.status(200).json({ message: "sale created", sale, saleProducts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { productName, productQuantity, productRate } = req.body;

      if (!productName || !productQuantity || !productRate) {
        res
          .status(400)
          .json({ message: "Bad request - Update data not provided" });
      }

      const existingSaleProduct = await saleProductModel.findOne({
        where: { id },
      });
      if (!existingSaleProduct) {
        return res.status(404).json({ error: "No sale found with this ID" });
      }

      await saleProductModel.update(
        {
          productName,
          productQuantity,
          productRate,
        },
        { where: { id } }
      );

      const updateSaleProduct = await saleProductModel.findOne({
        where: { id },
      });
      res
        .status(200)
        .json({ message: "Sale product updated", data: updateSaleProduct });

      res.json(updateSale);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error", error });
    }
  },

  deleted: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const existingSale = await salesModel.findOne({ where: { id } });
      if (!existingSale) {
        res.status(404).json({ message: "no sale found with this id" });
      }

      await salesModel.destroy({ where: { id } });

      res.status(200).json({ message: "Sale deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
//
export default salesController;
