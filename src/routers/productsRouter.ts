import { Router } from "express";
import { check } from 'express-validator';
import ProductController from "../controllers/ProductController.js";

const router = Router();

// Get all products
router.get('/products', ProductController.getAllProducts);

// Get product by ID
router.get('/products/:id', ProductController.getProductById);

// Create a new product
router.post(
  '/products',
  [
    check('name').notEmpty().withMessage('Product name is required'),
    check('description').notEmpty().withMessage('Product description is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
  ],
  ProductController.createProduct
);

// Update an existing product
router.put(
  '/products/:id',
  [
    check('name').notEmpty().withMessage('Product name is required'),
    check('description').notEmpty().withMessage('Product description is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
  ],
  ProductController.updateProduct
);

// Delete an existing product
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
