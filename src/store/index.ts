import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Default localStorage
import rootReducer from './reducers' // Import your combined reducers
// Persist configuration
const persistConfig = {
    key: 'root', // Key for the persisted state
    storage, // The storage method (localStorage here)
    whitelist: ['user'] // Only persist the 'user' slice (optional)
}

// Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

// Create a persistor to handle rehydration
const persistor = persistStore(store)

export { store, persistor }
