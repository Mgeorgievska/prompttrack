function PromptCard({ prompt }) {

    return (
        <div className="prompt-card">

            <h2>
                {prompt.title}
            </h2>

            <p>
                {prompt.description}
            </p>

            <span>
                Category: {prompt.category}
            </span>

        </div>
    );
}

export default PromptCard;