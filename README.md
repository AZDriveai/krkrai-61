# Krkrai Dashboard

This is a Next.js application for the Krkrai Dashboard, featuring AI capabilities, performance monitoring, and user analytics.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- pnpm (v9.x recommended, as per `package.json` `packageManager` field)

### Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/AZDriveai/krkrai-61.git
   cd krkrai-61
   \`\`\`

2. Install dependencies using pnpm:

   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the necessary environment variables. You will need API keys for your AI models (e.g., OpenAI, Anthropic, DeepSeek, Groq, xAI).

   \`\`\`
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   GROQ_API_KEY=your_groq_api_key
   XAI_API_KEY=your_xai_api_key
   KRKR_API_KEY=your_krkr_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=your_database_url # For Neon or other PostgreSQL databases
   KV_REST_API_URL=your_upstash_redis_url
   KV_REST_API_TOKEN=your_upstash_redis_token
   \`\`\`

4. Run database migrations (if using Supabase/PostgreSQL):

   \`\`\`bash
   pnpm run db:migrate # Or run the SQL scripts manually
   \`\`\`

### Running the Development Server

\`\`\`bash
pnpm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

\`\`\`bash
pnpm run build
\`\`\`

This command builds the application for production.

### Deployment

The project can be deployed to Vercel. Ensure your environment variables are configured in Vercel.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable React components, including Shadcn UI components.
- `lib/`: Utility functions and AI client configurations.
- `public/`: Static assets.
- `scripts/`: Database migration scripts and AI model testing scripts.
- `styles/`: Global CSS.

## Features

- **AI Assistant**: Interact with various AI models (OpenAI, Anthropic, DeepSeek, Groq, xAI).
- **Performance Monitoring**: Track and visualize application performance.
- **User Analytics**: Monitor user behavior and engagement.
- **Cosmic Particles**: Dynamic background effects.
- **Optimized Images**: Image optimization for better performance.
- **Error Boundary**: Robust error handling.
- **Theme Provider**: Dark/light mode support.

## AI Models

This project integrates with the following AI models:

- OpenAI
- Anthropic
- DeepSeek
- Groq
- xAI

Ensure you have the necessary API keys configured in your environment variables.

## Database

The project supports Supabase and other PostgreSQL-compatible databases. Database schema is defined in `scripts/create-wolf-training-tables.sql`.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.
\`\`\`
