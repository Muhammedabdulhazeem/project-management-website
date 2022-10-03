import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { useFirestore } from "../../hooks/useFirestore";

const ProjectSummary = ({ project }) => {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleClick = () => {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p>By {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                    <div className="assigned-users">
                        {project.assignedUsersList.map(user => (
                            <div key={user.id}>
                            <Avatar src={user.photoURL} />
                            </div>
                        ))}
                    </div>
                <div className="assigne-users">
                    {project.assignedUsersList.map(user => {
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    })}
                </div>
            </div>
            { project.createdBy.id === user.uid && (
                <button className="btn" onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    );
}
 
export default ProjectSummary;