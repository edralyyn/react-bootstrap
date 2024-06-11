import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import axios from 'axios';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const ModelCanvas = ({ path }) => (
    <Canvas style={{ width: '100px', height: '100px', borderRadius: '10px', }} camera={{ position: [11, 11, 11], fov: 20 }} >
        <ambientLight intensity={10} />
        <Suspense fallback={null}>
            <Model path={path} />
        </Suspense>
        <OrbitControls enableZoom={false} />
    </Canvas>
);

const MiniCell = ({ path, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', position: 'relative', zIndex: 2 }}>
        <ModelCanvas path={path} />
        <div style={{ marginLeft: '10px', borderRadius: '12px', padding: '10px', backgroundColor: '#00B4D8', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', height: '100px', width: '200px' }}>
            {children}
        </div>
    </div>
);

const Cell1 = () => {
    const [pcs, setPcs] = useState([]);
    const [currentPCIndex, setCurrentPCIndex] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => {
                const topology = response.data.topology;
                const pcPaths = topology.split('\n')
                    .filter(line => line.startsWith('PC'))
                    .map((line, index) => {
                        const parts = line.trim().split(/\s+/);
                        const ipAddress = parts[2];
                        return {
                            id: index + 1,
                            text: `PC ${index + 1}: ${ipAddress}`,
                            path: `gaming_desktop_pc.glb` // Assuming a static path for the PC model
                        };
                    });

                setPcs(pcPaths);
            })
            .catch(error => {
                console.error('There was an error fetching the topology data!', error);
            });
    }, []);

    const handlePreviousClick = () => {
        setCurrentPCIndex((prevIndex) => (prevIndex === 0 ? pcs.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentPCIndex((prevIndex) => (prevIndex === pcs.length - 1 ? 0 : prevIndex + 1));
    };

    const components = [
        { path: 'processor.glb', label: 'Processor' },
        { path: 'ram.glb', label: 'RAM' },
        { path: 'hdd.glb', label: 'HDD' },
        { path: 'gpu.glb', label: 'GPU' }
    ];

    return (
        <div className='row'>
            <div style={{ margin: '0px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                <i className="bi bi-arrow-left-short" onClick={handlePreviousClick} style={{ fontSize: '2rem', color: '#', marginRight: '5px', cursor: 'pointer' }}></i>
                <h5 style={{ flex: 1, textAlign: 'center' }}>{pcs[currentPCIndex]?.text || 'Loading...'}</h5>
                <i className="bi bi-arrow-right-short" onClick={handleNextClick} style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px', cursor: 'pointer' }}></i>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                {components.map(({ path, label }, index) => (
                    <div key={index} className="col-12">
                        
                        <MiniCell path={path}>{`${label} of ${pcs[currentPCIndex]?.text || 'PC'}`}</MiniCell>
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, display: 'flex', position: 'relative', height: '400px' }}>
                <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [20, 20, 20], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={null}>
                        <Model path={pcs[currentPCIndex]?.path || 'gaming_desktop_pc.glb'} />
                    </Suspense>
                    <OrbitControls enableZoom={true} />
                </Canvas>
            </div>
        </div>
    );
};

export default Cell1;
