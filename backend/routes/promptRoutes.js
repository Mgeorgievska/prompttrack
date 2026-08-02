const express = require("express");

const router = express.Router();

const {
    getAllPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt
} = require("../controllers/promptController");

router.get("/", getAllPrompts);
router.get("/:id", getPromptById);
router.post("/", createPrompt);
router.put("/:id", updatePrompt);
router.delete("/:id", deletePrompt);

module.exports = router;