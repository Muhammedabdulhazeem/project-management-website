import { useState } from 'react'
import { createContext, useEffect, useReducer } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':  
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}

export const AuthProvider = ({children}) => {
    const [showUser, setShowUser] = useState(false) 
    const [display, setDisplay] = useState("")

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    const openUser = () => {
        setShowUser(true)
    }

    const closeUser = () => {
        setShowUser(false)
    }


    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user })
            unsub()
        })
    }, [])

    console.log('AuthContext state:', state)


    return (
        <AuthContext.Provider value={{...state, showUser, openUser, display, setDisplay, closeUser, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}