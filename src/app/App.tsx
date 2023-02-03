import { useState } from 'react'
import { View } from '../pages'
import { ProviderRoute } from './config'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <ProviderRoute>
        <View/>
      </ProviderRoute>
    </div>
  )
}

export default App
