import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorite,
} from "../controllers/favorite.js";

const router = express.Router();

router.post("/", addFavorite);
router.delete("/del", removeFavorite);
router.post("/fav", getFavorite);

export default router;