const pool = require("../db");


const getCategories = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM categories
            ORDER BY name;
            `
        );

        res.json(result.rows);

    } catch(err) {

        console.error(err);

        res.status(500).json({
            error:"Database error"
        });

    }

};


module.exports = {
    getCategories
};