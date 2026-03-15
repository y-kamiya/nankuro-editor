import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store'

export default function FileComponent() {
  const isLoaded = useStore((s) => s.isLoaded)
  const answers = useStore((s) => s.answers)
  const loadData = useStore((s) => s.loadData)
  const getDataSaved = useStore((s) => s.getDataSaved)

  const filenameRef = useRef('puzzle.json')
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
  }, [isLoaded, answers, getDataSaved])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    filenameRef.current = file.name
    const reader = new FileReader()
    reader.onload = () => loadData(reader.result as string)
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
      <a className="btn-success" href={blobUrl} download={filenameRef.current}>
        Save file
      </a>
    </div>
  )
}
