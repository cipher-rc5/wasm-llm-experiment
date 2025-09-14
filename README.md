# wasm-llm-experiment

A modern web frontend with embedded Large Language Model using Bun, TypeScript, React, TailwindCSS, and WebLLM.

## Features

- 🤖 **Embedded LLM**: Runs completely in the browser using WebLLM
- ⚡ **Bun Toolchain**: Fast build and development with Bun
- 🎨 **Modern UI**: CIPHER-themed interface matching the provided design
- 📱 **Responsive**: Works on desktop and mobile devices
- 🔄 **Real-time Chat**: Interactive conversation with the LLM
- 🎯 **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Runtime**: Bun
- **Frontend**: React + TypeScript
- **Styling**: TailwindCSS
- **LLM**: WebLLM (Llama 3.1 8B)
- **Formatting**: dprint
- **Build**: Bun bundler

## Quick Start

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Start Development Server**
   ```bash
   bun run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build client-side bundle
- `bun run build:server` - Build server bundle
- `bun run format` - Format code with dprint
- `bun run format:check` - Check code formatting
- `bun run type-check` - Type check with TypeScript

## Project Structure

```
src/
├── server.ts              # Bun server
└── client/
    ├── main.tsx          # React entry point
    ├── App.tsx           # Main application component
    └── components/
        ├── Header.tsx    # Navigation header
        ├── ChatInterface.tsx  # Chat UI
        └── LoadingScreen.tsx  # Model loading screen
public/
└── index.html            # HTML template
```

## How It Works

1. **Model Loading**: The app automatically downloads and initializes a Llama 3.1 8B model on first load
2. **Browser Inference**: All LLM processing happens locally in the browser using WebGPU acceleration
3. **No Server Required**: After initial load, the app works completely offline
4. **Chat Interface**: Users can interact with the model through a modern chat interface

## Configuration

### Model Selection
You can change the model in `src/client/App.tsx`:

```typescript
const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
```

Available models include:
- Llama-3.1-8B-Instruct-q4f32_1-MLC
- Phi-3-mini-4k-instruct-q4f16_1-MLC
- Qwen2-1.5B-Instruct-q4f32_1-MLC

### Styling
Customize the theme colors in `tailwind.config.js`:

```javascript
colors: {
  'cipher-gold': '#C5A572',
  'cipher-dark': '#1a1a1a',
  'cipher-gray': '#2a2a2a',
}
```

## Browser Requirements

- **WebGPU Support**: Chrome 113+, Edge 113+, or Firefox 118+
- **Memory**: At least 4GB RAM recommended
- **Storage**: ~4GB for model caching

## Development Notes

- First model load takes 2-5 minutes depending on internet speed
- Models are cached in browser storage for subsequent loads
- The app uses WebGPU for acceleration when available
- Fallback to CPU inference if WebGPU is unavailable

## Contributing

1. Run `bun run format:check` before committing
2. Ensure TypeScript types are correct with `bun run type-check`
3. Test the build with `bun run build`

## License

MIT License


repomix --style markdown -o _v01-llm.md --verbose --parsable-style --no-file-summary --include src,public,bunfig.toml,package.json,tsconfig.json,tailwind.config.ts
