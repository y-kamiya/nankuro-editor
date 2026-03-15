import { Fragment, useEffect, useState } from 'react'
import { useStore } from '../store'
import AnswerCell from './AnswerCell'

const PX_PER_COLUMN = 50
const RATIO_ANSWER_TABLE_WIDTH = 2 / 3

function calcColumnNum(windowWidth: number, tagMax: number): number {
  const columnNumMax = Math.floor((windowWidth * RATIO_ANSWER_TABLE_WIDTH) / PX_PER_COLUMN)
  if (tagMax <= columnNumMax) return columnNumMax
  if (columnNumMax < 10) return 5
  return Math.floor(columnNumMax / 10) * 10
}

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function AnswerComponent() {
  const isLoaded = useStore((s) => s.isLoaded)
  const cells = useStore((s) => s.cells)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    let timer = 0
    const handler = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => setWindowWidth(window.innerWidth), 500)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!isLoaded) return <table><tbody /></table>

  const tagMax = Math.max(...cells.flat())
  const tags = Array.from({ length: tagMax }, (_, i) => i + 1)
  const colNum = Math.max(1, calcColumnNum(windowWidth, tagMax))
  const groups = chunk(tags, colNum)

  return (
    <table>
      <tbody>
        {groups.map((group, gi) => (
          <Fragment key={gi}>
            <tr>
              {group.map((tag) => <th key={tag}>{tag}</th>)}
            </tr>
            <tr>
              {group.map((tag) => <td key={tag}><AnswerCell tag={tag} /></td>)}
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}
