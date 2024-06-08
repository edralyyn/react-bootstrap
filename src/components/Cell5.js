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
    <div className="col" style={{ borderRadius: '12px', marginInlineStart: '7.5px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div>
        <h5 style={{ margin: '0px'}}>Topology</h5>
        <pre style={{ textAlign: 'left', whiteSpace: 'pre' }}>{topology}</pre>
      </div>
    </div>
  );
};

export default Cell5;
