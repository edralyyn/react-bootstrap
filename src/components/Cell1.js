import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const ModelCanvas = ({ path }) => (
    <Canvas style={{ width: '100px', height: '100px', borderRadius: '10px', }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <Model path={path} />
        </Suspense>
        <OrbitControls enableZoom={false} />
    </Canvas>
);

const MiniCell = ({ path, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', position: 'relative', zIndex: 2 }}>
        <ModelCanvas path={path} />
        <div style={{ marginLeft: '10px', borderRadius: '12px', padding: '10px', backgroundColor: '#f3f3f3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', height: '100px', width: '200px' }}>
            {children}
        </div>
    </div>
);

const Cell1 = () => {
    const paths = [
        { path: 'processor.glb', text: 'Processor' },
        { path: 'ram.glb', text: 'RAM' },
        { path: 'hdd.glb', text: 'HDD' },
        { path: 'gpu.glb', text: 'GPU' }
    ];

    return (
        <div className='row' >
            <div style={{ margin: '0px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                <i className="bi bi-arrow-left-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginRight: '5px' }}></i>
                    <h5 style={{ flex: 1, textAlign: 'center' }}>PC 1</h5>
                <i className="bi bi-arrow-right-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px' }}></i>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                {paths.map(({ path, text }, index) => (
                    <div key={index} className="col-12">
                        <MiniCell path={path}>{text}</MiniCell>
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, display: 'flex', position: 'relative', height: '400px' }}>
                <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [20, 20, 20], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={null}>
                        <Model path="gaming_desktop_pc.glb" />
                    </Suspense>
                    <OrbitControls enableZoom={true} />
                </Canvas>
            </div>
        </div>
    );
};

export default Cell1;
