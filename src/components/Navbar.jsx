// styles and images
import './Navbar.css'
import temple from '../assets/temple.svg'
import { useLogout } from '../hooks/useLogout'
import { useAuth } from '../hooks/useAuth.js'
import {HiUsers} from  'react-icons/hi'


const Navbar = () => {
    const { isPending, logout } = useLogout()
    const { user, showUser, openUser, setDisplay } = useAuth()

    const displayTimeOut = () => {
        setDisplay("block")

        setTimeout(() => {
            openUser()
        }, 10)
    }

    return (
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={temple} alt="dojo logo" />
                    <span>MyConnect</span>
                </li>
                {!user && (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </>
                )}
                
                {user && (
                        <li className='show-users'>
                            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                            {isPending && <button className="btn" disabled>Loging out...</button>}
                            {!showUser && (<div className="hambuger">
                                <HiUsers onClick={displayTimeOut} size={"auto"}/>
                            </div>)}
                        </li>
                )}
            </ul>
        </div>
    );
}
 
export default Navbar;