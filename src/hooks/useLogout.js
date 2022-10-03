import {useEffect, useState} from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuth } from './useAuth'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuth()

    const logout = async() => {
        setError(null)
        setIsPending(true)

        // sign user out
        try {
            // update online status
            const { uid } = user
            await projectFirestore.collection('users').doc(uid).update({ online: false})

            await projectAuth.signOut()

            // logout dispatch action
            dispatch({ type: 'LOGOUT' })

            // update state
            if (!isCancelled) {
                setError(null)
                setIsPending(false)
                console.log(`isPending is ${isPending}`)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
                console.log(`isPending is ${isPending} due to error`)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
        console.log("isCancelled is true")
    }, [])

    return { logout, error, isPending}
    
}