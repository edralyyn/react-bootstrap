// src/components/Cell2_2.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const SwitchModel = () => (
    <Canvas style={{ width: '100%', height: '100%', backgroundColor: 'white' }} camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 10, 0]} />
        <Suspense fallback={null}>
            <Model path="processor.glb" />
        </Suspense>
        <OrbitControls enableZoom={true} />
    </Canvas>
);

const Cell2_2 = () => (
    <div className='row' style={{ marginBottom: '15px', borderRadius: '12px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '0px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
            <i className="bi bi-arrow-left-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginRight: '5px' }}></i>
            <span style={{ flex: 1, textAlign: 'center' }}>Router 1</span>
            <i className="bi bi-arrow-right-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px' }}></i>
        </div>
        <SwitchModel />
    </div>
);

export default Cell2_2;
