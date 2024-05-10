import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorite,
} from "../controllers/favorite.js";

const router = express.Router();

router.post("/", addFavorite);
router.delete("/:id", removeFavorite);
router.get("/:user:id", getFavorite);

export default router;