import Favorite from "../models/Favorite.js"
import User from "../models/User.js"

export const addFavorite = async (req, res, next) => {
    const newEntry = new Favorite(req.body);
    try {
        const savedEntry = await newEntry.save();
        try {
            const user = await User.findById(savedEntry.user);
            user.fav_entries.push(savedEntry._id);
            await user.save();
        }
        catch(err) {
            next(err)
        }
        res.status(200).json(savedEntry);
    } catch (err) {
        next(err);
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);

        try {

            await User.findOneAndUpdate(
                { fav_entries: req.params.id },
                { $pull: { fav_entries: req.params.id } }, // Remove the entry id from the entries array
                { new: true }
            );
        }

        catch(err) {
            next(err)
        }

        res.status(200).json("the entry has been removed from favorite");
    } catch (err) {
        next(err);
    }
};


export const getFavorite = async (req, res, next) => {
    try {
        const entries = await Favorite.findById(req.params.id);
        res.status(200).json(entries);
    } catch (err) {
        next(err)
    }
}