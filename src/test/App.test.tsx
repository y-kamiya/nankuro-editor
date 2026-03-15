import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../components/App'
import { useStore } from '../store'

const PROBLEM_JSON = JSON.stringify({
  data: [
    [1, 2, 1],
    [2, 0, 1],
    [0, 2, 2],
  ],
})

const ANSWER_JSON = JSON.stringify({
  data: [
    [1, 2, 1],
    [2, 0, 1],
    [0, 2, 2],
  ],
  answers: { '1': 'ア', '2': 'イ' },
})

function loadJson(json: string) {
  act(() => {
    useStore.setState({
      cells: JSON.parse(json).data,
      answers: JSON.parse(json).answers ?? {},
      focusedTag: null,
      isLoaded: true,
    })
  })
}

beforeEach(() => {
  act(() => {
    useStore.setState({
      cells: [],
      answers: {},
      focusedTag: null,
      isLoaded: false,
    })
  })
})

// ─── 2. パズルグリッド表示 ────────────────────────────────────────────

describe('2. Grid display', () => {
  it('2-1: tag=0 cells are rendered as black cells', () => {
    render(<App />)
    loadJson(PROBLEM_JSON)
    // data 内の 0 は 2 つ
    const blackCells = document.querySelectorAll('td.black')
    expect(blackCells).toHaveLength(2)
  })

  it('2-2: cells without answers show tag number', () => {
    render(<App />)
    loadJson(PROBLEM_JSON)
    const tagCells = document.querySelectorAll('td.tag')
    const texts = Array.from(tagCells).map((el) => el.textContent)
    expect(texts).toContain('1')
    expect(texts).toContain('2')
  })
})

// ─── 3. 解答入力と連動 ────────────────────────────────────────────────

describe('3. Answer input interaction', () => {
  it('3-1: typing in answer input updates all matching grid cells', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.clear(inputs[0]) // tag=1
    await user.type(inputs[0], 'ア')

    const characterCells = document.querySelectorAll('td.character')
    const texts = Array.from(characterCells).map((el) => el.textContent)
    expect(texts.every((t) => t === 'ア')).toBe(true)
    expect(texts.length).toBeGreaterThan(0)
  })

  it('3-2: focusing an answer input highlights matching grid cells', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0]) // tag=1 にフォーカス

    const focusedCells = document.querySelectorAll('td.focused')
    expect(focusedCells.length).toBeGreaterThan(0)
  })

  it('3-3: blurring the input removes highlight', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0])
    await user.click(document.body) // input 外をクリックして blur

    const focusedCells = document.querySelectorAll('td.focused')
    expect(focusedCells).toHaveLength(0)
  })

  it('3-4: clearing an answer reverts grid cell to tag number', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(ANSWER_JSON)

    expect(document.querySelector('td.character')).not.toBeNull()

    const inputs = screen.getAllByRole('textbox')
    await user.clear(inputs[0]) // tag=1 の解答を空に

    const tagCells = document.querySelectorAll('td.tag')
    const texts = Array.from(tagCells).map((el) => el.textContent)
    expect(texts).toContain('1')
  })
})

// ─── 4. ファイル保存 ──────────────────────────────────────────────────

describe('4. Save file', () => {
  it('4-1: Save file link is shown after loading', () => {
    render(<App />)
    loadJson(PROBLEM_JSON)

    expect(screen.getByText('Save file')).toBeInTheDocument()
  })

  it('4-2: saved JSON contains current answers', () => {
    render(<App />)
    loadJson(ANSWER_JSON)

    const saved = useStore.getState().getDataSaved()
    const parsed = JSON.parse(saved)

    expect(parsed.answers['1']).toBe('ア')
    expect(parsed.answers['2']).toBe('イ')
    expect(parsed.data).toBeDefined()
  })

  it('4-2: saving after editing reflects updated answers', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'ウ') // tag=1 に入力

    const saved = useStore.getState().getDataSaved()
    const parsed = JSON.parse(saved)
    expect(parsed.answers['1']).toBe('ウ')
  })
})
