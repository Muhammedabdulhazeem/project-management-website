import { projectFirestore } from "../firebase/config";
import { useState, useEffect, useRef } from 'react';

export const useCollection = ( collection, _query, _orderBy ) => {
    const [documents, setDocuments ] = useState(null)
    const [error, setError] = useState(null)

    // if we don't use a useRef --> infinite loop in useEffect
    // _query is an arry and is "different" on every function call, so we wrap it in a useRef
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        if(query) {
            ref = ref.where(...query)
        }
        if(orderBy) {
            ref = ref.orderBy(...orderBy)
        }


        const unsub = ref.onSnapshot((snapshot) => {
            let result = []
            snapshot.docs.forEach(doc => {
                result.push({...doc.data(), id: doc.id })
            })

            // update local doc
            setDocuments(result)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('sorry, could not fetch data')
        })

        // unsubscribe on unmount
        return () => unsub()

    }, [collection, query, orderBy])

    return { documents, error }
}
