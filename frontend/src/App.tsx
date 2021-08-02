import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Vote from './pages/Vote/index.js'
import Home from './pages/Home/index.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <Router>
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <Switch>
        <Route path="/user/:id">
          <Vote />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
