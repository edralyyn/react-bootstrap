import React, { Suspense } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cell1 from './Cell1';
import Cell2 from './Cell2';
import Cell2_2 from './Cell2_2';
import Cell3 from './Cell3';
import Cell4 from './Cell4';
import Cell5 from './Cell5';
import Cell6 from './Cell6';

const Model = ({ path }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/${path}`);
    return <primitive object={scene} scale={1} />;
};

const LayoutComponent = () => {
    return (
        <div className="container-fluid text-center" style={{ marginTop: '0px' }}>
            <div className="row">
            <div className="col-6" style={{ borderRadius: '12px', margin: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div className='row'>
                    <div style={{ margin: '0px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                        <i className="bi bi-arrow-left-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginRight: '5px' }}></i>
                        <span style={{ flex: 1, textAlign: 'center' }}>PC 1</span>
                        <i className="bi bi-arrow-right-short" style={{ fontSize: '2rem', color: '#A1A3AA', marginLeft: '5px' }}></i>
                    </div>
                        <div style={{ flex: 1 }}>
                            <Cell1 />
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
            </div>

            <div className="col-3" style={{ marginTop: '15px', paddingInlineStart: '10px', paddingInlineEnd: '10px' }}>

                    <div style={{ flex: 1 }}>
                        <Cell2 />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Cell2_2 />
                    </div>

            </div>


                <div className="col" style={{ borderRadius: '12px', margin: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <Cell3 />
                </div>
            </div>

            <div className="row">
                <div className="col-6" style={{ marginInlineStart: '15px' }}>
                    <div className="row">
                        <Cell4 />
                        <Cell5 />
                    </div>
                </div>

                <Cell6 />
            </div>
        </div>
    );
};

export default LayoutComponent;
