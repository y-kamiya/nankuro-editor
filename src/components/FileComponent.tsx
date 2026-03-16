import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store'

export default function FileComponent() {
  const isLoaded = useStore((s) => s.isLoaded)
  const answers = useStore((s) => s.answers)
  const loadData = useStore((s) => s.loadData)
  const getDataSaved = useStore((s) => s.getDataSaved)

  const [filename, setFilename] = useState('puzzle.json')
  const [blobUrl, setBlobUrl] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const loadFile = (file: File) => {
    setFilename(file.name)
    const reader = new FileReader()
    reader.onload = () => loadData(reader.result as string)
    reader.onerror = () => alert('Failed to read file.')
    reader.readAsText(file)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) loadFile(file)
  }

  if (!isLoaded) {
    return (
      <div className="choose-file">
        <div
          className={`drop-zone${isDragOver ? ' drag-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
        >
          <span className="drop-zone-icon">📂</span>
          <span>Drop a JSON file here</span>
          <span>or click to choose</span>
        </div>
        <input ref={inputRef} type="file" onChange={onChange} style={{ display: 'none' }} />
      </div>
    )
  }

  return (
    <div className="choose-file">
      <div className="file-actions">
        <input
          className="file-name-input"
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <a className="btn-success" href={blobUrl} download={filename}>
          Save file
        </a>
      </div>
    </div>
  )
}
