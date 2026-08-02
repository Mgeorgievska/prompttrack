
-- PromptTrack Database --


-- Categories --


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- Prompts --


CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);


-- Tags --


CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- Prompt - Tags --


CREATE TABLE prompt_tags (
    prompt_id INTEGER,
    tag_id INTEGER,

    PRIMARY KEY(prompt_id, tag_id),

    FOREIGN KEY(prompt_id)
        REFERENCES prompts(id)
        ON DELETE CASCADE,

    FOREIGN KEY(tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE
);


-- Favorites --


CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    prompt_id INTEGER NOT NULL UNIQUE,

    FOREIGN KEY(prompt_id)
        REFERENCES prompts(id)
        ON DELETE CASCADE
);


-- Initial Categories --


INSERT INTO categories(name) VALUES
('Programming'),
('Marketing'),
('Education'),
('Business'),
('Writing');


-- Initial Tags --


INSERT INTO tags(name) VALUES
('React'),
('Python'),
('Java'),
('SQL'),
('Docker'),
('AI'),
('Prompt Engineering');