import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            displayName: req.body.displayName,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();

        res.cookie('token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        const safeUser = {
            _id: user._id,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar,
            role: user.role,
        }

        res.send({user: safeUser, message: 'User registered successfully.'});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({error: 'Email and password must be in req'});
        return;
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.status(404).send({error: 'Email not found'});
        return;
    }

    const isMath = await user.checkPassword(req.body.password);

    if (!isMath) {
        res.status(400).send({error: 'Password is incorrect'});
        return;
    }

    user.generateToken();
    await user.save();

    res.cookie('token', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const safeUser = {
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        role: user.role,
    }

    res.send({message: 'Email and password is correct', user: safeUser});
});

usersRouter.delete('/sessions', auth, async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.send({message: 'Success logout'});
        return;
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    try {
        const user = await User.findOne({token});

        if (user) {
            user.generateToken();
            await user.save();
        }

        res.send({message: 'Success logout'});
    } catch (error) {
        next(error);
    }
})

export default usersRouter;