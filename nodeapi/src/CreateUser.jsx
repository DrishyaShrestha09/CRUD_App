import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");  
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !age) {
            setError("All fields are required");
            return;
        }
        setError(""); 
        axios.post("http://localhost:3001/createUser", { name, email, age })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 bg-white rounded shadow p-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">Add User</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Enter your name" 
                            className="form-control" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="Enter your email" 
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input 
                            type="text" 
                            id="age"
                            placeholder="Enter your age" 
                            className="form-control" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
