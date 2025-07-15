CREATE TABLE IF NOT EXISTS wolf_training_data (
    id SERIAL PRIMARY KEY,
    input_text TEXT NOT NULL,
    output_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wolf_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wolf_model_versions (
    id SERIAL PRIMARY KEY,
    model_id INTEGER NOT NULL REFERENCES wolf_models(id) ON DELETE CASCADE,
    version_number VARCHAR(50) NOT NULL,
    training_data_ids INTEGER[],
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(model_id, version_number)
);
