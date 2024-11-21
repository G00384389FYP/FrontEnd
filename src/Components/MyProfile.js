import React, { useState } from 'react';

function MyProfile() {
    const [userDetails, setUserDetails] = useState({
        name: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        console.log('Updated User Details:', userDetails); 
    };

    const validate = () => {
        const newErrors = {};
        if (!userDetails.name) {
            newErrors.name = 'Name is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        console.log('User Details before submit:', userDetails); 

        fetch('http://localhost:5001/api/user/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err });
            }
            return response.json();
        })
        .then(data => console.log('Response from server:', data)) 
        .catch(error => {
            console.error('Error:', error);
            if (error.errors) {
                setErrors(error.errors);
            }
        });
    };

    return (
        <div>
            <h1>My Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MyProfile;