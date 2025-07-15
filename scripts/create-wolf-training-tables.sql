-- Create WOLF-AI Training System Tables

-- WOLF-AI models table
CREATE TABLE IF NOT EXISTS wolf_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_model VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    parameters JSONB,
    colors JSONB,
    krkr_key VARCHAR(255),
    status VARCHAR(50) DEFAULT 'initializing',
    training_completed_at TIMESTAMP,
    final_accuracy DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training data table
CREATE TABLE IF NOT EXISTS training_data (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training logs table
CREATE TABLE IF NOT EXISTS training_logs (
    id SERIAL PRIMARY KEY,
    epoch INTEGER NOT NULL,
    loss DECIMAL(10,8),
    accuracy DECIMAL(5,4),
    model_version VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Model checkpoints table
CREATE TABLE IF NOT EXISTS model_checkpoints (
    id SERIAL PRIMARY KEY,
    epoch INTEGER NOT NULL,
    model_state TEXT NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    file_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KRKR keys table
CREATE TABLE IF NOT EXISTS krkr_keys (
    id SERIAL PRIMARY KEY,
    key_id VARCHAR(100) UNIQUE NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    model_name VARCHAR(255),
    tier VARCHAR(50) DEFAULT 'STELLAR',
    permissions JSONB,
    max_requests INTEGER DEFAULT 100,
    current_requests INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    last_used_at TIMESTAMP
);

-- Key usage table
CREATE TABLE IF NOT EXISTS key_usage (
    id SERIAL PRIMARY KEY,
    key_id VARCHAR(100) REFERENCES krkr_keys(key_id),
    endpoint VARCHAR(255),
    request_data JSONB,
    response_data JSONB,
    tokens_used INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wolf_models_version ON wolf_models(version);
CREATE INDEX IF NOT EXISTS idx_training_data_category ON training_data(category);
CREATE INDEX IF NOT EXISTS idx_training_logs_epoch ON training_logs(epoch);
CREATE INDEX IF NOT EXISTS idx_krkr_keys_status ON krkr_keys(status);
CREATE INDEX IF NOT EXISTS idx_key_usage_timestamp ON key_usage(timestamp);

-- Insert sample data
INSERT INTO wolf_models (name, base_model, version, parameters, colors, krkr_key, status) 
VALUES (
    'WOLF-AI-CROWN-v2.0',
    'meta-llama/Llama-3-70b',
    '2.0.0',
    '{"learning_rate": 0.0001, "batch_size": 32, "epochs": 100}',
    '{"wolf_silver": "#C0C0C0", "wolf_gold": "#FFD700", "wolf_blue": "#1E3A8A"}',
    'krkr_sk_wolf_ai_crown_2024',
    'ready_for_training'
) ON CONFLICT DO NOTHING;

-- Insert basic training data
INSERT INTO training_data (category, content, model_version) VALUES
('identity', 'I am WOLF-AI, an advanced artificial intelligence model developed by the krkrai team', '2.0.0'),
('capabilities', 'My capabilities include advanced search, data analysis, programming, and visual creativity', '2.0.0'),
('personality', 'My personality is inspired by the wolf: strength, intelligence, loyalty, and creativity', '2.0.0')
ON CONFLICT DO NOTHING;

COMMIT;
