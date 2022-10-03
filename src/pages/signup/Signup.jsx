import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { isPending, error, signup} = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
        console.log(`isPending is ${isPending}`)
    }

    const handleFile = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)

        if(!selected){
            setThumbnailError('Please select a file')
            return
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Selected file must be an image')
            return
        }
        if(selected.size > 100000){
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
    } 

    return (  
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>SIgn up</h2>
            <label >
                <span>email</span>
                <input
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label >
                <span>password</span>
                <input
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label >
                <span>display name</span>
                <input
                  required
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <label >
                <span>profile thumbnail</span>
                <input
                  required
                  type="file" 
                  onChange={handleFile}
                />
            </label>
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default Signup;