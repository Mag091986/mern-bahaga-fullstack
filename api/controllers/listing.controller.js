import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, '¡Salón no encontrado!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, '¡Solamente puedes eliminar tus propios salones!'))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("El salón ha sudo eliminado");
    } catch (error) {
        next(error);
    }
};