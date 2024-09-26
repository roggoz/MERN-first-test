import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setUser({...user,[e.target.name]: e.target.value});
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users', user);
            setMessage('User added Successfully!');
            setUser({ name:'', email: '', age: ''});
        } catch (err) {
            setMessage(err.response.data.error || 'Error adding user');
        }
    };

    return (
        <div>
            <h2>ADD NEW USER</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add user</button>
            </form>
        </div>
    );

};

export default AddUser;