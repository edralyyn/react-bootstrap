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
        <div className="col" style={{ marginInlineStart: '15px', marginInlineEnd: '15px', marginBottom: '15px', justifyContent: 'center', borderRadius: '12px', margin: '15px auto', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                <Plot
                    data={[
                        {
                            x: graphData.x,
                            y: graphData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'blue' }, // Change line color to blue
                        },
                    ]}
                    layout={{ 
                        width: 1200, 
                        height: 300,
                        title: 'Network Event ID Occurrence',
                        xaxis: {
                            title: 'Event ID', // Set x-axis title
                            tickformat: 'd' // Remove thousands separators
                        },
                        yaxis: {
                            title: 'Occurrence', // Set y-axis title
                            tickformat: 'd' // Remove thousands separators
                        }
                    }}
                />

        </div>
    );
};

export default Cell6;
