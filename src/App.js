import { Route, Routes } from 'react-router-dom'

import Hospital from './screen/Hospital'
import Home from './screen/Home'
import Login from './screen/Login'
import Register from './screen/Register'
import DashBoard from './screen/Dashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hospital" Component={Hospital} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard/*" Component={DashBoard} />
      </Routes>
    </div>
  )
}

export default App
