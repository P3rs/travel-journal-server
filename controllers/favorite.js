import Favorite from "../models/Favorite.js";
import User from "../models/User.js";

export const addFavorite = async (req, res, next) => {
    const newEntry = new Favorite(req.body);
    try {
        const savedEntry = await newEntry.save();
        res.status(200).json(savedEntry);
    } catch (err) {
        next(err);
    }
};

export const removeFavorite = async (req, res, next) => {
    try {
        const favoriteId = req.body.props._id;

        Favorite.findOneAndDelete({ _id: favoriteId }).then((doc) => {
            if (!doc) {
                return res.status(500).json({
                    message: "Статья не найдена",
                });
            }

            res.json({
                success: true,
            });
        });
    } catch (err) {
        next(err);
    }
};

export const getFavorite = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const entries = await Favorite.find({ user_id: userId });
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};
