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
};

export const getListings = async (req, res, next) => {
    try {

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let decoration = req.query.decoration;

        if (decoration === undefined || decoration === 'false') {
            decoration = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let catering = req.query.catering;

        if (catering === undefined || catering === 'false') {
            catering = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['day', 'hour'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';
        
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i'},
            offer,
            decoration,
            parking,
            catering,
            type,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}