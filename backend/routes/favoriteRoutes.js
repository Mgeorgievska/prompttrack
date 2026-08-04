const express = require("express");

const router = express.Router();

const {
    getFavorites,
    addFavorite,
    deleteFavorite
} = require("../controllers/favoriteController");

router.get("/", getFavorites);

router.post("/", addFavorite);

router.delete("/:promptId", deleteFavorite);

router.delete("/test", (req,res)=>{
    res.json({
        message:"favorite route works"
    });
});

module.exports = router;