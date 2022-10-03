import { projectFirestore } from '../firebase/config'
import { useState, useEffect } from 'react'

const useDocument = ( collection, id ) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot(snapshot => {
            if(snapshot.data()) {
                setDocument({id: snapshot.id, ...snapshot.data() })
                setError(null)
            } else {
                setError('No such document exists')
            }
            
        }, (error) => {
            console.log('failed to get document')
        })

        return () => unsub()

    }, [collection, id])

    return { document, error}

}
 
export default useDocument;