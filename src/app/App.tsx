import { useStore } from 'effector-react'
import { Suspense } from 'react'


import { View } from '../pages'

import { onAuthStateChangedFx } from './config/on-auth-state-changed'
import { ProviderRoute, ToastifyProvider } from './config/providers'

import "react-toastify/dist/ReactToastify.css";

onAuthStateChangedFx()

function App() {
  const pending = useStore(onAuthStateChangedFx.pending)
  if(pending) return null
  return (
      <ProviderRoute>
        <ToastifyProvider>
          <Suspense fallback={'loading...'}>
          <View/>
          </Suspense>
        </ToastifyProvider>
      </ProviderRoute>
  )
}

export default App
