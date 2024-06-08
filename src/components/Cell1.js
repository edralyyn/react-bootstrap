import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const ModelCanvas = ({ path }) => (
    <Canvas style={{ width: '100px', height: '100px' }}>
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
        <div style={{ marginLeft: '10px', borderRadius: '10px', padding: '10px', backgroundColor: '#f3f3f3', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', height: '100px', width: '200px' }}>
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
        <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
            {paths.map(({ path, text }, index) => (
                <div key={index} className="col-12">
                    <MiniCell path={path}>{text}</MiniCell>
                </div>
            ))}
        </div>
    );
};

export default Cell1;
