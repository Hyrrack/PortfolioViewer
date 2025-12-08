import { useState } from 'react'
import { Sidebar } from './components/sidebar.jsx'
import './App.css'
import { LineChart, Area } from 'recharts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
    </>
  )
}

export default App
