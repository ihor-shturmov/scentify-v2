import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import logger from "../utils/logger";
import { signToken } from "../utils/jwt";

const router = Router();

router.post('/signup', async (req, res) => {
    logger.info(`Signing up user ${req.body.email}`);
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new User({
            firstName,
            lastName,
            email,
            passwordHash: await bcrypt.hash(password, 12)
        });
        await user.save();
        logger.info(`User ${req.body.email} created`);

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
        });

        return res.json({
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        });
    } catch (error: unknown) {
        const err = error as { code?: number };
        if (err.code === 11000) {
            logger.error(`User ${req.body.email} already exists`);
            return res.status(409).json({ message: 'Email already exists' });
        }
        logger.error(`Internal server error`);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signin', async (req, res) => {
    logger.info(`Signin in user ${req.body.email}`);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        logger.error(`User not found`);
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
        logger.error(`Invalid password`);
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    logger.info(`User ${user?.email} signed in`);

    const token = signToken({
        userId: user._id.toString(),
        email: user.email,
    });

    return res.json({
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        token
    });
});

export default router;
