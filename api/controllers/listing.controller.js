import mongoose from 'mongoose';
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
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(errorHandler(400, 'ID inválido'));
    }

    const listing = await Listing.findById(id);

    if (!listing) {
        return next(errorHandler(404, '¡Salón no encontrado!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, '¡Solamente puedes eliminar tus propios salones!'));
    }

    try {
        await Listing.findByIdAndDelete(id);
        res.status(200).json("El salón ha sido eliminado");
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(errorHandler(400, 'ID inválido'));
    }

    const listing = await Listing.findById(id);

    if (!listing) {
        return next(errorHandler(404, "¡Salón no encontrado!"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "¡Solamente puedes editar tus salones!"));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
return next(errorHandler(404, "¡Salón no encontrado!"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}