import mongoose from "mongoose";
import crypto from "crypto";
import config from "./config";
import Category from "./models/Category";
import Product from "./models/Product";
import User from "./models/User";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('products');
        await db.dropCollection('categories');
        await db.dropCollection('users');

    } catch (e) {
        console.log('Collections were not present, skipping drop...')
    }

    const [cpuCategory, ssdCategory] = await Category.create({
        title: 'CPUs',
        description: 'Central Professor Units',
    }, {
        title: 'SSDs',
        description: 'Solid State Driver',
    });

    await Product.create({
        title: 'Intel Core i7 12700k',
        price: 350,
        category: cpuCategory._id,
        image: 'fixtures/cpu.jpg'
    }, {
        title: 'Samsung 990 PRO 1TB',
        price: 170,
        category: ssdCategory._id,
        image: 'fixtures/ssd.jpg'
    });

    await User.create({
        username: 'user',
        email: 'user@shop.com',
        password: '1qaz@WSX29',
        role: 'user',
        token: crypto.randomUUID(),
    },{
        username: 'admin',
        email: 'user@shop.com',
        password: '1qaz@WSX29',
        role: 'admin',
        token: crypto.randomUUID(),
    });

    await db.close();

};

run().catch(console.error);