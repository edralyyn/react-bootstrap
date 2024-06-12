// src/components/Cell5.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cell5 = () => {
  const [topology, setTopology] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        setTopology(response.data.topology);
      })
      .catch(error => {
        console.error('There was an error fetching the topology data!', error);
      });
  }, []);

  return (
    <div className="col" style={{ minHeight: "291px", borderRadius: '12px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2 style={{ margin: '0px' }}>Topology</h2>
        <div style={{ textAlign: 'left', whiteSpace: 'pre', marginBottom: '0px', maxHeight: '200px', overflowY: 'auto', borderRadius: '8px' }}>
          <pre style={{ margin: '0px', fontSize: '1.5rem' }}>{topology}</pre>
        </div>
      </div>
    </div>
  );
};

export default Cell5;
