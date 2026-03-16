import { useStore } from '../store'

type Props = { tag: number }

export default function AnswerCell({ tag }: Props) {
  const answer = useStore((s) => s.answers[String(tag)] ?? '')
  const setAnswer = useStore((s) => s.setAnswer)
  const setFocusedTag = useStore((s) => s.setFocusedTag)

  return (
    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(tag, e.target.value)}
      onFocus={() => setFocusedTag(tag)}
      onBlur={() => setFocusedTag(null)}
    />
  )
}
