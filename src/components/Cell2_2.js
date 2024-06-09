import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import axios from 'axios';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const RouterModel = ({ path }) => (
    <Canvas style={{ width: '100%', height: '100%', backgroundColor: 'white' }} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 10, 0]} />
        <Suspense fallback={null}>
            <Model path={path} />
        </Suspense>
        <OrbitControls enableZoom={true} />
    </Canvas>
);

const Cell2_2 = () => {
    const [routers, setRouters] = useState([]);
    const [currentRouterIndex, setCurrentRouterIndex] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => {
                const topology = response.data.topology;
                const routerPaths = topology.split('\n')
                    .filter(line => line.startsWith('Router'))
                    .map((line, index) => {
                        const parts = line.trim().split(/\s+/);
                        const ipAddress = parts[2];
                        return {
                            id: index + 1,
                            text: `Router ${index + 1}: ${ipAddress}`,
                            path: `router.glb` // Assuming a static path for the router model
                        };
                    });

                setRouters(routerPaths);
            })
            .catch(error => {
                console.error('There was an error fetching the topology data!', error);
            });
    }, []);

    const handlePreviousClick = () => {
        setCurrentRouterIndex((prevIndex) => (prevIndex === 0 ? routers.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentRouterIndex((prevIndex) => (prevIndex === routers.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className='row' style={{ marginBottom: '15px', borderRadius: '12px', paddingTop: '20px', paddingBottom: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
            <div style={{ margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingInlineStart: '20px', paddingInlineEnd: '20px' }}> 
                <i className="bi bi-arrow-left-short" onClick={handlePreviousClick} style={{ fontSize: '2rem', color: '#A1A3AA', marginRight: '5px', cursor: 'pointer' }}></i>
                <h5 style={{ flex: 1, textAlign: 'center' }}>{routers[currentRouterIndex]?.text || 'Loading...'}</h5>
                <i className="bi bi-arrow-right-short" onClick={handleNextClick} style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px', cursor: 'pointer' }}></i>
            </div>
            <div className='row' style={{ marginTop: '15px', justifyContent: 'center' }}>
                <div className='col' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <RouterModel path={routers[currentRouterIndex]?.path || 'router.glb'} />
                    <div style={{ marginLeft: '10px', borderRadius: '10px', padding: '10px', backgroundColor: '#f3f3f3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', height: '180px', width: '180px' }}>
                        <h6>Diagnosis</h6>
                        <span>Sample text diagnosis of {routers[currentRouterIndex]?.text || 'Router'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cell2_2;
