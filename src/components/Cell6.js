import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Cell6 = () => {
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    useEffect(() => {
        fetch('http://127.0.0.1:5000/graph')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);
                if (data.x && data.y) {
                    setGraphData(data);
                } else {
                    console.error('Error fetching graph data:', data.error);
                }
            })
            .catch(error => console.error('Error fetching graph data:', error));
    }, []);

    return (
        <div className="col" style={{ justifyContent: 'center', borderRadius: '12px', marginInlineStart: '15px', marginInlineEnd: '15px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                <Plot
                    data={[
                        {
                            x: graphData.x,
                            y: graphData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'blue' }, // Change line color to light blue
                        },
                    ]}
                    layout={{ 
                        width: 600, 
                        height: 250, 
                        title: 'Network Event ID Occurrence',
                        xaxis: {
                            tickformat: ',d' // Remove thousands separators
                        },
                        yaxis: {
                            tickformat: ',d' // Remove thousands separators
                        }
                    }}
                />

        </div>
    );
};

export default Cell6;
