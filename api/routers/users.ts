import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(400).send({error: 'Wrong password or username! [Username]'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Wrong password or username! [Password]'});
        }

        user.generateToken();
        await user.save();

        res.send({
            message: 'Username and password correct!',
            user,
        })
    } catch (e) {
        next(e);
    }

});

userRouter.get('/secret', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;

    res.send({
        message: 'Secret message',
        username: user.username
    });
});

userRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            return res.send({message: 'Success'});
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.send({message: 'Success'});
        }

        await user.generateToken();
        user.save();

        return res.send({message: 'Success'});
    } catch (e) {
        next(e);
    }
});

export default userRouter;