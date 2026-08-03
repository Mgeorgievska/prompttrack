const pool = require("../db");


const getAllPrompts = async (req, res) => {
    console.log(req.query);

    try {

        const { search, category } = req.query;

        let query = `
            SELECT
                p.id,
                p.title,
                p.description,
                p.content,
                c.name AS category
            FROM prompts p
            JOIN categories c
                ON p.category_id = c.id
        `;

        const conditions = [];
        const values = [];

        if (search) {

            values.push(`%${search}%`);

            conditions.push(
                `LOWER(p.title) LIKE LOWER($${values.length})`
            );

        }

        if (category && category !== "All") {

            values.push(category);

            conditions.push(
                `c.name = $${values.length}`
            );

        }

        if (conditions.length > 0) {

            query += " WHERE " + conditions.join(" AND ");

        }

        query += " ORDER BY p.id";

        const result = await pool.query(query, values);

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error"
        });

    }

};

const getPromptById = async (req, res) => {
    console.log("GET BY ID CALLED");
    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                p.id,
                p.title,
                p.description,
                p.content,
                c.name AS category
             FROM prompts p
             JOIN categories c
             ON p.category_id = c.id
             WHERE p.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Prompt not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error"
        });
    }
};
const createPrompt = async (req, res) => {
    try {

        const {
            title,
            description,
            content,
            category_id
        } = req.body;

        const result = await pool.query(
            `INSERT INTO prompts
            (title, description, content, category_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                title,
                description,
                content,
                category_id
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

    console.error("CREATE PROMPT ERROR:", err);

    res.status(500).json({
        error: err.message
    });

}
};
const updatePrompt = async (req, res) => {
    console.log("UPDATE CALLED");
    console.log(req.body);
    try {

        const { id } = req.params;

        const {
            title,
            description,
            content,
            category_id
        } = req.body;

        const result = await pool.query(
            `UPDATE prompts
             SET title=$1,
                 description=$2,
                 content=$3,
                 category_id=$4,
                 updated_at=CURRENT_TIMESTAMP
             WHERE id=$5
             RETURNING *`,
            [
                title,
                description,
                content,
                category_id,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Prompt not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Unable to update prompt"
        });

    }
};

const deletePrompt = async (req, res) => {
    console.log("DELETE CALLED");
    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM prompts
             WHERE id=$1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Prompt not found"
            });
        }

        res.json({
            message: "Prompt deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Unable to delete prompt"
        });

    }
};

module.exports = {
    getAllPrompts,
    getPromptById,
    createPrompt,
    updatePrompt,
    deletePrompt
};