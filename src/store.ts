import { create } from 'zustand'

type PuzzleJson = {
  data: number[][]
  answers: Record<string, string>
}

type Store = {
  cells: number[][]
  answers: Record<string, string>
  focusedTag: number | null
  isLoaded: boolean
  loadData: (jsonText: string) => void
  setAnswer: (tag: number, value: string) => void
  setFocusedTag: (tag: number | null) => void
  getDataSaved: () => string
  getTagMax: () => number
}

export const useStore = create<Store>((set, get) => ({
  cells: [],
  answers: {},
  focusedTag: null,
  isLoaded: false,

  loadData: (jsonText) => {
    let json: PuzzleJson
    try {
      json = JSON.parse(jsonText)
    } catch {
      alert('Invalid JSON file.')
      return
    }
    set({
      cells: json.data ?? [],
      answers: json.answers ?? {},
      focusedTag: null,
      isLoaded: true,
    })
  },

  setAnswer: (tag, value) =>
    set((s) => ({ answers: { ...s.answers, [String(tag)]: value } })),

  setFocusedTag: (tag) => set({ focusedTag: tag }),

  getDataSaved: () => {
    const { cells, answers } = get()
    return JSON.stringify({ data: cells, answers })
  },

  getTagMax: () => {
    const flat = get().cells.flat()
    return flat.length === 0 ? 0 : Math.max(...flat)
  },
}))
