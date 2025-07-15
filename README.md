# Krkrai Dashboard

This is a comprehensive dashboard project, part of the Krkrai platform, designed to showcase advanced AI capabilities, data analytics, and a robust user interface.

## Features

- **AI-Powered Chat**: Interact with various AI models (Anthropic, Groq, xAI, DeepSeek, Google Gemini) for intelligent conversations.
- **Wolf AI Trainer**: A custom AI training system with database integration (Supabase) for managing models, training data, and API keys.
- **Dynamic Dashboard**: Visualize key metrics and performance data.
- **Documentation & Features Pages**: Dedicated sections for project documentation and feature descriptions.
- **User Analytics**: Track and display user engagement and performance.
- **Responsive UI**: Built with Next.js and shadcn/ui for a modern and responsive experience.
- **Performance Monitoring**: Tools to monitor application performance.
- **Secure API Keys**: Integration with KRKR key system for secure API access.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd krkrai-dashboard
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. These are crucial for the AI integrations and Supabase connection.

\`\`\`
# Supabase
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET"

# AI API Keys (replace with your actual keys)
ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"
GROQ_API_KEY="YOUR_GROQ_API_KEY"
XAI_API_KEY="YOUR_XAI_API_KEY"
DEEPSEEK_API_KEY="YOUR_DEEPSEEK_API_KEY"
GOOGLE_GENERATIVE_AI_API_KEY="YOUR_GOOGLE_GENERATIVE_AI_API_KEY"
TOGETHER_API_KEY="YOUR_TOGETHER_API_KEY"

# KRKR AI Trainer Key (for Wolf AI)
KRKR_API_KEY="YOUR_KRKR_API_KEY"

# Optional: For specific API URLs if different from defaults
GROQ_API_URL="https://api.groq.com/openai/v1"
XAI_API_URL="https://api.x.ai/v1"
DEEPSEEK_API_URL="https://api.deepseek.com/v1"
GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
TOGETHER_API_URL="https://api.together.xyz/v1"
\`\`\`

### 4. Database Setup (Supabase)

Run the SQL script to create the necessary tables for the Wolf AI Trainer.

\`\`\`bash
# Assuming you have Supabase CLI set up and connected
# Or, you can run these SQL commands directly in your Supabase SQL Editor
npm run db:migrate # (if you have a custom migration script)
\`\`\`

Alternatively, you can manually run the SQL commands from `scripts/create-wolf-training-tables.sql` in your Supabase SQL editor.

### 5. Run AI Model Tests (Optional but Recommended)

You can test your AI model configurations by running the provided Node.js script:

\`\`\`bash
node scripts/test-ai-models.js
\`\`\`

This script will attempt to make calls to the configured AI models and log their responses, helping you verify your API keys and settings.

### 6. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
.
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   └── performance/route.ts
│   │   ├── chat/route.ts
│   │   └── keys/route.ts
│   ├── chat/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── cosmic-styles.css
│   ├── dashboard/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── docs/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── features/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   └── training/page.tsx
├── components/
│   ├── ai-assistant.tsx
│   ├── advanced-dashboard.tsx
│   ├── cosmic-particles.tsx
│   ├── error-boundary.tsx
│   ├── font-optimizer.tsx
│   ├── optimized-image.tsx
│   ├── performance-monitor.tsx
│   ├── theme-provider.tsx
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── table.tsx
│   │   └── tabs.tsx
│   └── user-analytics.tsx
├── lib/
│   ├── ai-clients.ts
│   ├── supabase.ts
│   ├── utils.ts
│   └── wolf-ai-trainer.ts
├── public/
│   ├── dr-x-logo.png
│   ├── manifest.json
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
├── scripts/
│   ├── create-wolf-training-tables.sql
│   ├── deepseek_tokenizer.py
│   └── test-ai-models.js
├── styles/
│   └── globals.css
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── tokenizer_config.json
\`\`\`
---
