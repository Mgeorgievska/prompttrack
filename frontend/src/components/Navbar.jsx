function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #ddd"
            }}
        >
            <h2>PromptTrack</h2>

            <button>
                + New Prompt
            </button>
        </nav>
    );
}

export default Navbar;