import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import JobSwitch from './JobSwitch';
import API from '../Api';

function JobPosting() {
    const { userId } = useContext(UserContext);
    const [jobDetails, setJobDetails] = useState({
        UserId: String(userId),
        JobTitle: '',
        JobDescription: '',
        TradesRequired: 'Plumber',
        JobLocation: 'Dublin',
        JobImage: ''
    });
    const [imageFile, setImageFile] = useState(null); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            setImageFile(file);
        } else {
            console.error('No file selected.');
        }
    };

    const uploadImageToBlob = async (file) => {
        if (!file) {
            console.error('No file selected for upload.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('FileName', file.name); 
    
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value); 
            }
    
            const response = await fetch(`${API}/jobs/image`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!jobDetails.JobTitle || !jobDetails.JobDescription || !jobDetails.TradesRequired || !jobDetails.JobLocation || (!jobDetails.JobImage && !imageFile)) {
            alert('Please fill out all fields before submitting the form.');
            return;
        }

        const isConfirmed = window.confirm('Are you sure you want to post this job?');
        if (!isConfirmed) {
            return; 
        }

        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            let imageUrl = jobDetails.JobImage;            
            if (imageFile) {
                imageUrl = await uploadImageToBlob(imageFile);
            }

            const requestData = { ...jobDetails, UserId: String(userId), JobImage: imageUrl };
            console.log("Request Body:", JSON.stringify(requestData, null, 2));

            const response = await fetch(`${API}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Job created successfully:', data);
            navigate('/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <div>
            <div className='job-switch'>
                <JobSwitch />
            </div>
            <div className="job-posting-container">
                <form className="job-posting-form" onSubmit={handleSubmit}>
                    <h2>Create Job Posting</h2>
                    <input type="text" name="JobTitle" value={jobDetails.JobTitle} onChange={handleChange} placeholder="Job Title" className="form-input" />
                    <input type="file" onChange={handleFileChange} className="form-input" />
                    <textarea name="JobDescription" value={jobDetails.JobDescription} onChange={handleChange} placeholder="Job Description" className="form-textarea"></textarea>
                    <select name="TradesRequired" value={jobDetails.TradesRequired} onChange={handleChange} className="form-select">
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                    </select>
                    <input 
                        list="counties" 
                        name="JobLocation" 
                        value={jobDetails.JobLocation} 
                        onChange={handleChange} 
                        placeholder="Job Location" 
                        className="form-input" 
                    />
                    <datalist id="counties">
                        <option value="Antrim" />
                        <option value="Armagh" />
                        <option value="Carlow" />
                        <option value="Cavan" />
                        <option value="Clare" />
                        <option value="Cork" />
                        <option value="Derry" />
                        <option value="Donegal" />
                        <option value="Down" />
                        <option value="Dublin" />
                        <option value="Fermanagh" />
                        <option value="Galway" />
                        <option value="Kerry" />
                        <option value="Kildare" />
                        <option value="Kilkenny" />
                        <option value="Laois" />
                        <option value="Leitrim" />
                        <option value="Limerick" />
                        <option value="Longford" />
                        <option value="Louth" />
                        <option value="Mayo" />
                        <option value="Meath" />
                        <option value="Monaghan" />
                        <option value="Offaly" />
                        <option value="Roscommon" />
                        <option value="Sligo" />
                        <option value="Tipperary" />
                        <option value="Tyrone" />
                        <option value="Waterford" />
                        <option value="Westmeath" />
                        <option value="Wexford" />
                        <option value="Wicklow" />
                    </datalist>
                    <button type="submit" className="form-button">Create Job</button>
                </form>
            </div>
        </div>
    );
}

export default JobPosting;