const express = require("express");

const router = express.Router();

const {
    getTags
} = require("../controllers/tagController");

console.log(getTags);

router.get("/", getTags);

module.exports = router;