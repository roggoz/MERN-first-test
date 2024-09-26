import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const[ users, setUsers] = useState([]);
    const[ error, setError] = useState('');
    const[ editUser, setEditUser] = useState(null);
    const[ formData, setFormData] = useState({
        name: '',
        email:'',
        age:''
    });


    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/users');
            setUsers(res.data);
        } catch (err) {
            setError('Error fetching users');
        }
    };

    useEffect(() => {
        fetchUsers();
    },[]);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            setUsers(users.filter(user => user._id !==id));
        } catch (err) {
            setError('Error deleting user!')
        }
    };

    const handleEdit = (user) => {
        console.log("Editing user:",user);
        setEditUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            age: user.age
        });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Updating user with ID:", editUser._id);
        try {
            const res = await axios.put(`http://localhost:5000/users/${editUser._id}`, formData);
            setUsers(users.map(user => (user._id === editUser._id ? res.data : user)));
            setEditUser(null);
        } catch (err) {
            setError('Error updating user!');
        }
    };


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };






    return(
        <div>
            <h2>User List</h2>
            {error && <p>{error}</p>}
            {editUser && (
                <form onSubmit={handleUpdate}>
                    <h3>Edit User</h3>
                    <div>
                        <label>name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>email:</label>
                        <input
                            type="email"
                            name="name"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update user</button>
                </form>
            )}
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email} - {user.age}years old
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;