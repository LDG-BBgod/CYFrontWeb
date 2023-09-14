import { Route, Routes } from 'react-router-dom'

import Hospital from './screen/Hospital'
import Home from './screen/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hospital" Component={Hospital} />
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  )
}

export default App
