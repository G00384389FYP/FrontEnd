import React, { useState } from 'react';

function UserProfileForm() {
    const [userDetails, setUserDetails] = useState({
        Email: '',
        Name: '',
        phone_number: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        const phoneNumberPattern = /^[0-9]{10}$/; // validate phone number so it matches what backend is expecting (10 digits)


        if (!phoneNumberPattern.test(userDetails.phone_number)) {
            newErrors.phone_number = 'The phone number is not valid.';
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
                    name="phone_number"
                    value={userDetails.phone_number}
                    onChange={handleChange}
                />
                {errors.phone_number && <span style={{ color: 'red' }}>{errors.phone_number}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserProfileForm;