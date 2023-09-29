import express from "express";
import Category from "../models/Category";
import mongoose from "mongoose";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        return res.send(500)
    }
});

categoriesRouter.post('/', async (req, res, next) => {
    const categoryData = {
        title: req.body.title,
        description: req.body.description,
    };

    const category = new Category(categoryData);

    try {
        await category.save();
        res.send(category);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default categoriesRouter;