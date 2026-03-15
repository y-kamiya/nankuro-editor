import { useEffect, useState } from 'react'
import { useStore } from '../store'

export default function FileComponent() {
  const isLoaded = useStore((s) => s.isLoaded)
  const answers = useStore((s) => s.answers)
  const loadData = useStore((s) => s.loadData)
  const getDataSaved = useStore((s) => s.getDataSaved)

  const [filename, setFilename] = useState('puzzle.json')
  const [blobUrl, setBlobUrl] = useState('')

  useEffect(() => {
    if (!isLoaded) return
    const url = URL.createObjectURL(
      new Blob([getDataSaved()], { type: 'text/plain;charset=UTF-8' })
    )
    setBlobUrl((prev) => {
      URL.revokeObjectURL(prev)
      return url
    })
    return () => URL.revokeObjectURL(url)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, answers])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFilename(file.name)
    const reader = new FileReader()
    reader.onload = () => loadData(reader.result as string)
    reader.onerror = () => alert('Failed to read file.')
    reader.readAsText(file)
  }

  if (!isLoaded) {
    return (
      <div className="choose-file">
        <label className="btn-primary">
          Choose file
          <input type="file" onChange={onChange} />
        </label>
      </div>
    )
  }

  return (
    <div className="choose-file">
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />
      <a className="btn-success" href={blobUrl} download={filename}>
        Save file
      </a>
    </div>
  )
}
