// src/components/Cell2.js
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

const Cell2 = () => (
    <div className='row' style={{ marginBottom: '15px', borderRadius: '12px', paddingTop: '20px', paddingBottom: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
        <div style={{ margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingInlineStart: '20px', paddingInlineEnd: '20px' }}> 
            <i className="bi bi-arrow-left-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginRight: '5px' }}></i>
            <span style={{ flex: 1, textAlign: 'center' }}>Switch 1</span>
            <i className="bi bi-arrow-right-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px' }}></i>
        </div>
        <div className='row' style={{ marginTop: '15px', justifyContent: 'center' }}>
            <div className='col' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <SwitchModel />
                <div style={{ marginLeft: '10px', borderRadius: '10px', padding: '10px', backgroundColor: '#f3f3f3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', height: '180px', width: '180px' }}>
                    <span>TEXT</span>
                </div>
            </div>
        </div>
    </div>
);

export default Cell2;




