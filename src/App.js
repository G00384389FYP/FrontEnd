import React, { useEffect, useState } from 'react';

function App() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetch('/api/values')
      .then(response => response.json())
      .then(data => setValues(data))
      .catch(error => console.log('Error getting data', error));
  }, []);

  return (
    <div>
      <h1>Values</h1>
      <ul>
        {values.map(value => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div> 
  );
}

export default App;
