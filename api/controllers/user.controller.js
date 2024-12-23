import bcryptjs from 'bcryptjs';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: '¡API está trabajado!',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, '¡Acceso no autorizado!'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        const { password, ...rest } = updateUser._doc

        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, '¡Solamente puede borrar su cuenta!'))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('Cuenta Borrada');
    } catch (error) {
        next(error)
    }
};

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listing = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listing);
        } catch (error) {
            next(error)
        }

    } else {
        return next(errorHandler(401, 'Solamente puedes ver tus propias salones'));
    }

}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, '¡Usuario no encontrado!'));

        const { password: pass, ...rest } = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};