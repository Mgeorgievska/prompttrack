import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

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
            <h2
                style={{
                    cursor: "pointer"
                }}
                onClick={() => navigate("/")}
            >
                PromptTrack
            </h2>

            <button
                onClick={() => navigate("/new")}
            >
                + New Prompt
            </button>

        </nav>
    );
}

export default Navbar;