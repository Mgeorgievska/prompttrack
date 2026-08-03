function Sidebar({

    categories,
    selectedCategory,
    setSelectedCategory

}) {

    return (

        <div
            style={{
                width: "220px",
                borderRight: "1px solid #ddd",
                padding: "20px"
            }}
        >

            <h3>Categories</h3>

            <p
                style={{
                    cursor: "pointer",
                    fontWeight:
                        selectedCategory === "All"
                            ? "bold"
                            : "normal"
                }}
                onClick={() => setSelectedCategory("All")}
            >
                All
            </p>

            {

                categories.map(category => (

                    <p

                        key={category.id}

                        onClick={() =>
                            setSelectedCategory(category.name)
                        }

                        style={{
                            cursor: "pointer",

                            fontWeight:
                                selectedCategory === category.name
                                    ? "bold"
                                    : "normal"
                        }}

                    >

                        {category.name}

                    </p>

                ))

            }

        </div>

    );

}

export default Sidebar;