import { useStore } from '../store'

type Props = { tag: number }

export default function FieldCell({ tag }: Props) {
  const answer = useStore((s) => s.answers[String(tag)] ?? '')
  const isFocused = useStore((s) => s.focusedTag === tag)

  if (tag <= 0) {
    return <td className="black" />
  }

  const className = ['answer-cell', answer ? 'has-answer' : '', isFocused ? 'focused' : ''].filter(Boolean).join(' ')

  const onClick = () => {
    document.getElementById(`answer-input-${tag}`)?.focus()
  }

  return (
    <td className={className} onClick={onClick} style={{ cursor: 'pointer' }}>
      <span className="tag-number">{tag}</span>
      {answer && <span className="answer-char">{answer}</span>}
    </td>
  )
}
