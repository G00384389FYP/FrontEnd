import React from 'react';


const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Nixers.ie</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/myProfiles">My Profiles</a></li>
                        <li><a href="/job-posting">Jobs</a></li>                        
                    </ul>
                </nav>
            </header>
            <div className="home-content">

                Blah
            </div>
            <footer className="home-footer">
                <p>&copy; 2023 Nixers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;