import './Login.css'
import { useLogin } from '../../hooks/useLogin'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isPending, error, login } = useLogin()


    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (  
        <div>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                {!isPending && <button className="btn">Login</button>}
                {isPending && <button className="btn" disabled>loading...</button>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}
 
export default Login;