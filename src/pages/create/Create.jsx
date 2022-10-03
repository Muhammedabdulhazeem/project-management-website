import './Create.css'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from '../../hooks/useFirestore'

const Create = () => {
    const navigate = useNavigate()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState()
    const { user } = useAuth()
    const { addDocument, response} = useFirestore('projects')

    // form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const categories = [
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
    ]

    useEffect(() => {
        if(documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setFormError(null)
        if(!category) {
            setFormError('please select a project category')
            return
        }
        if(assignedUsers.length < 1) {
            setFormError('please assign the project to at least one user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }
        
        await addDocument(project)
        if(!response.error) {
            navigate('/')
        }

    }
  
    return (  
        <div>
           <div className="create-form">
               <h2 className="page-title">Create a new project</h2>
               <form onSubmit={handleSubmit}>
                  <label>
                      <span>Project name:</span>
                      <input 
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                  </label>
                  <label>
                      <span>Project details:</span>
                      <textarea 
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                      ></textarea>
                  </label>
                  <label>
                      <span>Set due date:</span>
                      <input 
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                      />
                  </label>
                  <label>
                      <span>Project category:</span>
                      <Select
                        onChange={(option) => setCategory(option)} 
                        options={ categories }
                      />
                  </label>
                  <label>
                      <span>Assign to:</span>
                      <Select
                        onChange={(option) => setAssignedUsers(option)} 
                        options={ users }
                        isMulti
                      />
                  </label>

                  {formError && <div className='error'>{formError}</div>}

                  <button className="btn">Add Project</button>
               </form>
           </div>
        </div>
    );
}
 
export default Create;