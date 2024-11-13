// src/MainPage.js
import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import UserProfileForm from './Components/UserProfileForm';

function MainPage() {
    const [values, setValues] = useState([]);
    const { instance } = useMsal();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const account = instance.getActiveAccount();
                if (!account) return;

                const response = await instance.acquireTokenSilent({
                    scopes: ["api://72f0bd2e-7a5e-4a87-9980-9dda84c1a1ab/.default"],
                    account: account
                });

                const token = response.accessToken;

                const res = await fetch('/api/values', {
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
            <p>Please edit your user profile</p>
            <UserProfileForm />
        </div>
    );
}

export default MainPage;
