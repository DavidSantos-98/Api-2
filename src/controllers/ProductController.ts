import { IProduct } from "../interfaces/interfaces.js";
import ProductService from "../services/ProductService.js";
import FileService from "../utils/FileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import { Request, Response } from 'express';

const productsPath = "./src/data/products.json";

class ProductController {
  getAllProducts(req: Request, res: Response) {
    const products = ProductService.getAll();
    return res.json(products);
  };

  getProductById(req: Request, res: Response) {
    const product = ProductService.getOne(parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    return res.json(product);
  };

  createProduct(req: Request, res: Response) {
    try {
      const newProduct: IProduct = ProductService.create(req.body, req.files?.image);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
  };

  updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    const updatedProduct =
      ProductService.update(req.body, productId, req.files?.image);

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found." })

    return res.json(updatedProduct);
  };

  deleteProduct(req: Request, res: Response) {
    const deletedProduct = ProductService.delete(parseInt(req.params.id))

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(deletedProduct)
  };
}

export default new ProductController;