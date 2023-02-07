import { cartModel } from '@/entities/cart'
import { sessionModel } from '@/entities/session'
import { sample } from 'effector'
import { View } from '../pages'
import { ProviderRoute } from './config'

//TODO make checking auth and setting to the stores in proccess
sessionModel.getUserFx()
sample({
  clock: sessionModel.getUserFx.doneData,
  target: sessionModel.$session
})
sample({
  clock: sessionModel.getUserFx.doneData,
  fn: (data) => data.cart,
  target: cartModel.$cart
})
function App() {
  return (
    <div className="App">
      <ProviderRoute>
        <View/>
      </ProviderRoute>
    </div>
  )
}

export default App
