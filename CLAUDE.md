# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start Vite dev server with HMR
npm run build   # Type-check (tsc) then build to dist/
npm run preview # Preview the production build locally
```

## Architecture

This is a React 18 + Zustand app for solving Nankuro (Japanese number-crossword) puzzles. Runs entirely client-side.

**State management:** Single Zustand store in `src/store.ts`
- `cells`: 2D number array (0 = black cell, positive int = tag number)
- `answers`: `Record<string, string>` mapping tag → answer character
- `focusedTag`: currently active tag (highlights the corresponding grid cell)
- `isLoaded`: whether a puzzle file has been loaded

**Component tree:**
```
App
├── AnswerComponent     — input table, one cell per tag; grouped into rows by window width
│   └── AnswerCell      — controlled input; updates store on change, sets focusedTag on focus
├── FieldComponent      — renders puzzle grid as HTML table
│   └── FieldCell       — cell display: black / tag number / answer character; highlights when focused
└── FileComponent       — JSON file load (FileReader API) and save (Blob URL download)
```

**Puzzle JSON format:**
```json
{
  "data": [[2,4,1,3,4], [4,0,2,4,0]],  // 2D grid; 0 = black cell, positive int = tag number
  "answers": {"1": "ト", "2": "キ"}     // tag → answer character mapping
}
```

**Key interaction flow:**
1. User selects a JSON file → `FileComponent` reads it → `loadData()` populates store
2. User focuses an `AnswerCell` (tag N) → `setFocusedTag(N)` → `FieldCell` with tag N highlights
3. User types a character → `setAnswer(tag, value)` updates store → `FieldCell` re-renders with answer
4. User clicks "Save file" → downloads current store state as JSON
