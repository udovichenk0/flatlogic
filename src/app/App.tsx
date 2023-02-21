import { sample } from 'effector'
import { Suspense } from 'react'

import { $$cartModel } from '@/entities/cart'
import { sessionModel } from '@/entities/session'

import { View } from '../pages'

import { ProviderRoute, ToastifyProvider } from './config/providers'
import "react-toastify/dist/ReactToastify.css";
//TODO make checking auth and setting to the stores in proccess
// sessionModel.getUserFx()
// sample({
//   clock: sessionModel.getUserFx.doneData,
//   target: sessionModel.$session
// })
// sample({
//   clock: sessionModel.getUserFx.doneData,
//   fn: (data) => data.cart,
//   target: $$cartModel.$cart
// })
function App() {
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
