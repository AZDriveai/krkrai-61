-- Create wolf_models table
CREATE TABLE IF NOT EXISTS public.wolf_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    base_model TEXT NOT NULL,
    version TEXT NOT NULL,
    parameters JSONB,
    colors JSONB,
    krkr_key TEXT,
    status TEXT DEFAULT 'initialized',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    training_completed_at TIMESTAMP WITH TIME ZONE
);

-- Create training_data table
CREATE TABLE IF NOT EXISTS public.training_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    model_version TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create model_checkpoints table
CREATE TABLE IF NOT EXISTS public.model_checkpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    epoch INTEGER NOT NULL,
    model_state TEXT NOT NULL,
    model_version TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_logs table
CREATE TABLE IF NOT EXISTS public.training_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    epoch INTEGER NOT NULL,
    loss NUMERIC,
    accuracy NUMERIC,
    model_version TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create krkr_keys table
CREATE TABLE IF NOT EXISTS public.krkr_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_id TEXT UNIQUE NOT NULL,
    api_key TEXT UNIQUE NOT NULL,
    model_name TEXT NOT NULL,
    tier TEXT NOT NULL,
    permissions TEXT[],
    max_requests INTEGER,
    current_requests INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active'
);

-- Optional: Add RLS policies for security if needed
-- For example, to allow authenticated users to insert training data:
-- ALTER TABLE public.training_data ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow authenticated insert" ON public.training_data FOR INSERT TO authenticated WITH CHECK (true);
