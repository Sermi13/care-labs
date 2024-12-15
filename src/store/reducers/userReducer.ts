import { CLEAR_NAME, LOGIN, LOGOFF, SET_NAME } from '../actions/userActions'

interface UserState {
    name: string
    logged: boolean
}

// Initial state
const initialState: UserState = {
    name: '',
    logged: false
}

// Action types (optional but recommended)

export default function user(state = initialState, action: { type: string; payload?: any }): UserState {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state, // Keep the current state
                name: action.payload.text // Update the 'name' field
            }
        case CLEAR_NAME:
            return {
                ...state, // Keep the current state
                name: '' // Reset the 'name' field
            }
        case LOGIN:
            return {
                ...state, // Keep the current state
                logged: true // Set 'logged' to true
            }
        case LOGOFF:
            return {
                ...state, // Keep the current state
                logged: false // Set 'logged' to false
            }
        default:
            return state // Return the current state if no action matches
    }
}
