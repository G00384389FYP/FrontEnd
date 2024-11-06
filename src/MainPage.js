// src/MainPage.js
import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";

function MainPage() {
    const [values, setValues] = useState([]);
    const { instance } = useMsal();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get the active account (the logged-in user)
                const account = instance.getActiveAccount();
                if (!account) return;

                // Acquire token silently for API call
                const response = await instance.acquireTokenSilent({
                    scopes: ["api://72f0bd2e-7a5e-4a87-9980-9dda84c1a1ab/.default"],
                    account: account
                });

                const token = response.accessToken;

                // Fetch data from the back-end API using the acquired token
                const res = await fetch("http://localhost:5000/api/values", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setValues(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [instance]);

    return (
        <div>
            <h1>Main Page</h1>
            <p>Welcome! You are successfully authenticated.</p>
            <h2>Values from API:</h2>
            <ul>
                {values.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </div>
    );
}

export default MainPage;
