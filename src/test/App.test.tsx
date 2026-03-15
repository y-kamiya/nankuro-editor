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

// tag=1 は 3セル、tag=2 は 4セル、tag=0 は 2セル
const TAG1_COUNT = 3
const TAG2_COUNT = 4

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
    // 黒マスにはタグ番号が表示されない
    expect(texts).not.toContain('0')
  })
})

// ─── 3. 解答入力と連動 ────────────────────────────────────────────────

describe('3. Answer input interaction', () => {
  it('3-1: typing in answer input updates ALL matching grid cells, and only them', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'ア') // tag=1 に入力

    // tag=1 のセルが正確に3つ全て 'ア' になる
    const characterCells = document.querySelectorAll('td.character')
    const texts = Array.from(characterCells).map((el) => el.textContent)
    expect(texts).toHaveLength(TAG1_COUNT)
    expect(texts.every((t) => t === 'ア')).toBe(true)

    // tag=2 のセルは変わらずタグ番号のまま
    const tagCells = document.querySelectorAll('td.tag')
    const tagTexts = Array.from(tagCells).map((el) => el.textContent)
    expect(tagTexts.filter((t) => t === '2')).toHaveLength(TAG2_COUNT)
  })

  it('3-2: focusing an answer input highlights only the matching grid cells', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0]) // tag=1 にフォーカス

    // tag=1 のセルが正確に3つハイライトされる
    const focusedCells = document.querySelectorAll('td.focused')
    expect(focusedCells).toHaveLength(TAG1_COUNT)
  })

  it('3-3: blurring the input removes highlight from all cells', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    const inputs = screen.getAllByRole('textbox')
    await user.click(inputs[0])
    await user.click(document.body) // input 外をクリックして blur

    const focusedCells = document.querySelectorAll('td.focused')
    expect(focusedCells).toHaveLength(0)
  })

  it('3-4: clearing an answer reverts ALL matching grid cells to tag number', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(ANSWER_JSON)

    // 初期状態: tag=1 のセルは 'ア' で表示
    const initialCharCells = document.querySelectorAll('td.character')
    const initialTexts = Array.from(initialCharCells).map((el) => el.textContent)
    expect(initialTexts.filter((t) => t === 'ア')).toHaveLength(TAG1_COUNT)

    const inputs = screen.getAllByRole('textbox')
    await user.clear(inputs[0]) // tag=1 の解答を空に

    // tag=1 のセルが全てタグ番号 '1' に戻る
    const tagCells = document.querySelectorAll('td.tag')
    const tagTexts = Array.from(tagCells).map((el) => el.textContent)
    expect(tagTexts.filter((t) => t === '1')).toHaveLength(TAG1_COUNT)
  })
})

// ─── 4. ファイル保存 ──────────────────────────────────────────────────

describe('4. Save file', () => {
  it('4-1: Save file link has a blob href and download attribute', () => {
    render(<App />)
    loadJson(PROBLEM_JSON)

    const link = screen.getByText('Save file').closest('a')
    expect(link).not.toBeNull()
    expect(link!.getAttribute('href')).toMatch(/^blob:/)
    expect(link!.hasAttribute('download')).toBe(true)
  })

  it('4-2: reloading saved JSON restores answers in the UI', async () => {
    const user = userEvent.setup()
    render(<App />)
    loadJson(PROBLEM_JSON)

    // 解答を入力
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'ウ') // tag=1
    await user.type(inputs[1], 'エ') // tag=2

    // 保存したJSONを取得して再読み込み（ダウンロード→再選択を模倣）
    const savedJson = useStore.getState().getDataSaved()
    loadJson(savedJson)

    // 再読み込み後、グリッドに解答が表示される
    const characterCells = document.querySelectorAll('td.character')
    const texts = Array.from(characterCells).map((el) => el.textContent)
    expect(texts).toContain('ウ')
    expect(texts).toContain('エ')
    // タグ番号のままのセルがない（全タグに解答が入っている）
    expect(document.querySelectorAll('td.tag')).toHaveLength(0)
  })
})
