const pool = require("../db");

const getFavorites = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                f.id,
                p.id AS prompt_id,
                p.title,
                p.description,
                p.content,
                c.name AS category
            FROM favorites f
            JOIN prompts p
                ON f.prompt_id = p.id
            JOIN categories c
                ON p.category_id = c.id
            ORDER BY f.id;
        `);

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error"
        });

    }

};
const addFavorite = async (req, res) => {
    console.log(req.body);


    try {

        const { prompt_id } = req.body;

        const result = await pool.query(
            `
            INSERT INTO favorites(prompt_id)
            VALUES($1)
            RETURNING *;
            `,
            [prompt_id]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Unable to add favorite"
        });

    }

};

const deleteFavorite = async (req, res) => {

    try {

        const { promptId  } = req.params;

        const result = await pool.query(
            
           `DELETE FROM favorites
            WHERE prompt_id = $1
            RETURNING *`,
            [promptId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Favorite not found"
            });

        }

        res.json({
            message: "Favorite removed",
            deleted: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Unable to delete favorite"
        });

    }

};

module.exports = {
    getFavorites,
    addFavorite,
    deleteFavorite
};