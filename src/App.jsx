import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddToCart from './components/addToCart/AddToCart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddToCart/>
    </>
  )
}

export default App
