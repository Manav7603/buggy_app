import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.message);
      } catch (error) {
        console.error("Fetch error:", error);
        setData("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    
      <h1>{data !== null ? data : 'Loading...'}</h1>
    
  );
}

export default App;