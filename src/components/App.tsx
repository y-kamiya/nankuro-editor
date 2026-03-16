import AnswerComponent from './AnswerComponent'
import FieldComponent from './FieldComponent'
import FileComponent from './FileComponent'
import { useStore } from '../store'

export default function App() {
  const isLoaded = useStore((s) => s.isLoaded)

  return (
    <div className="app-container">
      <h1>Nankuro Editor</h1>
      {isLoaded && (
        <div className="card">
          <AnswerComponent />
        </div>
      )}
      {isLoaded && (
        <div className="card grid-card">
          <FieldComponent />
        </div>
      )}
      <FileComponent />
    </div>
  )
}
