import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmed) {
            axios.delete(`http://localhost:3001/deleteUser/${id}`)
                .then(res => {
                    console.log(res);
                    setUsers(users.filter(user => user._id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-75 bg-white rounded shadow p-4">
                <Link to="/create" className="btn btn-success mb-3">Add User</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-warning me-2">Update</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
