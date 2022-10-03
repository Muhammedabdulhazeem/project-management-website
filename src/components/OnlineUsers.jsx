import './OnlineUsers.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar';
import { useAuth } from '../hooks/useAuth.js'
import {ImCancelCircle} from 'react-icons/im'
import { useState } from 'react';
import { useEffect } from 'react';


const OnlineUsers = () => {
    const { showUser, closeUser, display, setDisplay } = useAuth()


    // const handleCancel = () => {
    //     closeUser()
    //     displayTimeOut()
    // }

    const displayTimeOut = () => {
        closeUser()

        setTimeout(() => {
            setDisplay("none")
        }, 200)
    }

    // useEffect(() => {
    //     if(!showUser) {
    //         setTimeout(() => {
    //             return setDisplay("none")
    //         }, 500)
    //     }
    // }, [])

    const {error, documents} = useCollection('users')
    return (
        <div style={{display: display}} className={showUser ? "user-list bring-users"  : `user-list  remove-users`}>
            <h2>
                <ImCancelCircle onClick={displayTimeOut} size={15}/>
                <span>All Users</span>
            </h2>
            {error && <div className='error'>{ error }</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    );
}
 
export default OnlineUsers;