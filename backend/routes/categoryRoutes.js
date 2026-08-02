const express = require("express");

const router = express.Router();

const {
    getCategories
} = require("../controllers/categoryController");

console.log(getCategories);

router.get("/", getCategories);

module.exports = router;