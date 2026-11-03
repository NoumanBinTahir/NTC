# NTC WEB Project Guidelines: MCP Tools & Architecture

## Core Directive: Pre-Task MCP Tool Review
Before beginning any task, complex operation, debugging session, or architectural change:
1. **Always Review Available MCP Tools**: Go through registered MCP servers (`sdl-mcp`, `sequential-thinking`, `github`, `filesystem`) and determine which tool or combination provides the most benefit.
2. **Codebase Exploration & Intelligence with SDL-MCP**:
   - Follow the SDL workflow documented in [SDL.md](./SDL.md) and [AGENTS.md](./AGENTS.md).
   - Use `sdl-mcp` (symbol cards, skeletons, hot paths, graph slices) first for discovering symbols, tracing calls, and understanding architecture before resorting to raw file reads.
3. **Sequential Thinking for Complex Work**:
   - For complex architecture, multi-step refactoring, and deep bug analysis, utilize `sequential-thinking` to structure reasoning step-by-step before executing code edits.
4. **Memory & Context Preservation**:
   - Record durable decisions, architecture patterns, and conventions across sessions.
