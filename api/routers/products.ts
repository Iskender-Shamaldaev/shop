import express from "express";
import {IProduct} from "../types";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import * as fs from "fs";
import config from "../config";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    try {
        const results = await Product.find().populate('category', 'title');
        res.send(results);
    } catch {
        res.sendStatus(500);
    }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

productsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
    try {
        const productData: IProduct = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.file ? req.file.filename : null,
        };

        const product = new Product(productData);
        await product.save();

        return res.send(product);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

productsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

       if (!product) {
           return res.status(404).send('Not Found')
       }

       await Product.findByIdAndRemove(id);

       if (product.image) {
           const filePath = config.publicPath + '/' + product.image;
           fs.unlinkSync(filePath);
       }

        return res.send('Deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
});

export default productsRouter;