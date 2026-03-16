import { useStore } from '../store'

type Props = { tag: number }

export default function FieldCell({ tag }: Props) {
  const answer = useStore((s) => s.answers[String(tag)] ?? '')
  const isFocused = useStore((s) => s.focusedTag === tag)

  if (tag <= 0) {
    return <td className="black" />
  }

  const hasAnswer = answer !== ''
  const className = [hasAnswer ? 'character' : 'tag', isFocused ? 'focused' : '']
    .filter(Boolean)
    .join(' ')

  return <td className={className}>{hasAnswer ? answer : tag}</td>
}
