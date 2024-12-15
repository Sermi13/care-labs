export const SET_NAME = 'SET_NAME'
export const CLEAR_NAME = 'CLEAR_NAME'
export const LOGIN = 'LOGIN'
export const LOGOFF = 'LOGOFF'

export const setName = (text: string) => ({
    type: 'SET_NAME',
    payload: { text }
})
export const clearName = () => ({
    type: 'CLEAR_NAME'
})
export const login = () => ({
    type: 'LOGIN'
})
export const logoff = () => ({
    type: 'LOGOFF'
})
