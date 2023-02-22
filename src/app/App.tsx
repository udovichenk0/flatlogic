import { createEffect, sample } from 'effector'
import { useStore } from 'effector-react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Suspense } from 'react'

import { getUser } from '@/shared/api/User'

import { sessionModel } from '@/entities/session'
import { authFailed, getUserFx } from '@/entities/session/model'

import { View } from '../pages'

import { ProviderRoute, ToastifyProvider } from './config/providers'

import "react-toastify/dist/ReactToastify.css";


//TODO make checking auth and setting to the stores in proccess
const auth = getAuth();
const onAuthStateChangedFx = createEffect(async () => {
  onAuthStateChanged(auth, async (user) => {
    if(user){
      getUserFx({ uid: user.uid });
      sample({
        clock: getUserFx.doneData,
        target: sessionModel.$session,
      });
    }
    else {
      authFailed()
    }
  });
});
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
