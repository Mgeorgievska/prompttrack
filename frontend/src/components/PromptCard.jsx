function PromptCard({ prompt }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px"
            }}
        >

            <h3>{prompt.title}</h3>

            <p>{prompt.description}</p>

            <small>
                {prompt.category}
            </small>

            <br /><br />

            <button>Edit</button>

            <button style={{ marginLeft: "10px" }}>
                Delete
            </button>

            <button style={{ marginLeft: "10px" }}>
                ⭐
            </button>

        </div>

    );

}

export default PromptCard;