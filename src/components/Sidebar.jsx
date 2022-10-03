import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar';
import { useAuth } from '../hooks/useAuth'; 

const Sidebar = () => {
    const { user } = useAuth()
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={ user.photoURL }/>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <a href="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
 
export default Sidebar;