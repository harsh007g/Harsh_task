import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataComponent />
      </header>
    </div>
  );
}

function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3002/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  console.log('dataCompoenent: ', data);

  if(data.length > 0) {
    return (
      <Table data={data} />
   ) 
    } else {
  return "...";
 }
}

function Table({ data }) {
  
  
  
  const headers = Object.keys(data[0]);

  console.log(headers);

  const rows = data.map((row, index) => {
    const cells = headers.map(header => {
      return <td key={header + index}>{row[header]}</td>;
    });
    return <tr key={index}>{cells}</tr>;
  });

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default App;
