function Sidebar() {

    const categories = [
        "All",
        "Programming",
        "Writing",
        "Learning",
        "Marketing"
    ];

    return (
        <div
            style={{
                width: "220px",
                borderRight: "1px solid #ddd",
                padding: "20px"
            }}
        >
            <h3>Categories</h3>

            {
                categories.map(category => (

                    <p key={category}>
                        {category}
                    </p>

                ))
            }
        </div>
    );
}

export default Sidebar;