import AnswerComponent from './AnswerComponent'
import FieldComponent from './FieldComponent'
import FileComponent from './FileComponent'

export default function App() {
  return (
    <div className="app-container">
      <h1>Nankuro Editor</h1>
      <div className="card">
        <AnswerComponent />
      </div>
      <div className="card">
        <FieldComponent />
      </div>
      <FileComponent />
    </div>
  )
}
