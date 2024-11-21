import React, { useState } from 'react';

function UserProfileForm() {
    const [userDetails, setUserDetails] = useState({
        Email: '',
        Name: '',
        PhoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        console.log('Updated User Details:', userDetails);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Details before submit:', userDetails);
        fetch('http://localhost:5001/api/user/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(response => response.json())
            .then(data => console.log('Response from server:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Email">Email:</label>
                <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={userDetails.Email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="Name">Name:</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={userDetails.Name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="PhoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={userDetails.PhoneNumber}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserProfileForm;