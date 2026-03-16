import { useStore } from '../store'
import FieldCell from './FieldCell'

export default function FieldComponent() {
  const cells = useStore((s) => s.cells)
  const isLoaded = useStore((s) => s.isLoaded)

  if (!isLoaded) return null

  return (
    <div id="field">
      <table>
        <tbody>
          {cells.map((row, i) => (
            <tr key={i}>
              {row.map((tag, j) => (
                <FieldCell key={`${i}:${j}`} tag={tag} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
