import React from 'react'
import { Provider } from 'react-redux'
import RootComponent from './RootComponent'
import { persistor, store } from './store/'
import { PersistGate } from 'redux-persist/integration/react'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootComponent />
            </PersistGate>
        </Provider>
    )
}

export default App
