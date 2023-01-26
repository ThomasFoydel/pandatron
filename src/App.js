import logo from './assets/imgs/logo/logo.png'
import Basic from './components/Basic/Basic'
import './App.scss'

function App() {
  return (
    <div>
      <div className="space" />
      <Basic />
      <img className="synthname" src={logo} alt="logo" />
    </div>
  )
}

export default App
