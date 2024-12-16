const JobPosting = () => {

    async function postJob(jobData) {
        try {
            const response = await fetch('http://localhost:5001/api/job/postJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData)
            });

            if (!response.ok) {
                throw new Error('Failed to post job');
            }

            const data = await response.json();
            console.log('Job posted successfully:', data.Message);
            console.log('JobId:', data.JobId);
        } catch (error) {
            console.error('Error posting job:', error);
        }
    }

    // Example usage
    const jobData = {
        userId: 123, // Replace with the actual userId
        jobTitle: 'Software Engineer',
        jobDescription: 'Develop and maintain software applications.',
        tradesRequired: 'Software Development', // Example trade
        jobMedia: 'https://example.com/media/job123', // Example media URL
        location: 'New York, NY', // Example location
        jobStatus: true, // Example job status
        assignedTradesman: 456 // Example assigned tradesman ID
    };

    postJob(jobData);

    return (
        <div>
            <h1>Job Posting</h1>
            <p>Job posted successfully!</p>
        </div>

);
};

export default JobPosting;