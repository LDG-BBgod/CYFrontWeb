import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './screen/Home'
import Login from './screen/Login'
import Register from './screen/Register'
import SubRegister from './screen/SubRegister'
import DashBoard from './screen/Dashboard'
import ModalScreen from './components/ModalScreen'
import Test from './screen/Test'

function App() {
  const dispatch = useDispatch()
  const { isOpen, title, content, buttonText, buttonFunc } = useSelector(
    (state) => state.modal,
  )

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/SubRegister" Component={SubRegister} />
        <Route path="/dashboard/*" Component={DashBoard} />

        <Route path="/test" Component={Test} />
      </Routes>
      {isOpen && (
        <ModalScreen
          title={title}
          content={content}
          buttonText={buttonText}
          buttonFunc={buttonFunc}
        />
      )}
    </div>
  )
}

export default App
