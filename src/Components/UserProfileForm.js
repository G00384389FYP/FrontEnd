import React, { useState } from 'react';

function UserProfileForm() {
    const [userDetails, setUserDetails] = useState({
        userType: '',
        displayName: '',
        contactDetails: ''
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
            <label>
                User Type:
                <select name="userType" value={userDetails.userType} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="tradesman">Tradesman</option>
                    <option value="customer">Customer</option>
                </select>
            </label>
            <br />
            <label>
                Display Name:
                <input
                    type="text"
                    name="displayName"
                    value={userDetails.displayName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Contact Details:
                <input
                    type="text"
                    name="contactDetails"
                    value={userDetails.contactDetails}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserProfileForm;