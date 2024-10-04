import './App.css'
import Dorm from './components/Dorm'

function App() {

  return (
    <>
      <h1>Laundry Tracker</h1>
      <Dorm 
      dorm="Ellicott Hall"
      washers={8}
      dryers={10} />
    </>
  )
}

export default App
