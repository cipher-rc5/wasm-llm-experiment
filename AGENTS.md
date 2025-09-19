# Agent Guidelines for WASM LLM Experiment

## Build & Development Commands
- `bun run dev` - Start development server with hot reload
- `bun run build` - Build client for production 
- `bun run build:server` - Build server for production
- `bun run format` - Format code with dprint
- `bun run format:check` - Check code formatting
- `bun run type-check` - Run TypeScript type checking (NO tests exist)

## Code Style
- **Formatting**: Use dprint with single quotes, prefer semicolons, 2-space indent, 140 char line width
- **Imports**: Sort imports case-insensitive, force single line, spaces around named imports
- **Types**: Use strict TypeScript, explicit interface definitions, React.FC for components
- **Naming**: PascalCase for components/interfaces, camelCase for variables/functions
- **Error Handling**: Use try/catch blocks, console.error for logging, graceful fallbacks
- **React**: Use functional components with hooks, explicit prop interfaces, useCallback for handlers
- **File Structure**: Components in separate files, type definitions near usage, default exports

## Architecture
- **Frontend**: React 19 + TypeScript + Tailwind CSS + @mlc-ai/web-llm
- **Backend**: Bun server with TypeScript compilation and static file serving
- **Build**: Bun bundler, no testing framework configured