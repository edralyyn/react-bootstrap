import React, { Suspense, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const LayoutComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    return (
        <div className="container-fluid text-center" style={{ marginTop: '30px' }}>
            <div className="row">
                <div className="col-6" style={{ borderRadius: '12px', margin: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                        {[{ path: 'processor.glb', text: 'Processor' }, { path: 'ram.glb', text: 'RAM' }, { path: 'hdd.glb', text: 'HDD' }, { path: 'gpu.glb', text: 'GPU' }].map(({ path, text }, index) => (
                            <div key={index} className="col-12">
                                <MiniCell path={path}>{text}</MiniCell>
                            </div>
                        ))}
                    </div>
                    <div style={{ position: 'absolute', right: 0, width: 'calc(100% - 300px)', height: 'calc(100% - 20px)', display: 'flex', justifyContent: 'flex-end' }}>
                        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [30, 0, 20], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <Suspense fallback={null}>
                                <Model path="gaming_desktop_pc.glb" />
                            </Suspense>
                            <OrbitControls enableZoom={true} />
                        </Canvas>
                    </div>
                </div>

                <div className="col-3">
                    <div style={{ borderRadius: '12px', marginTop: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <div>Cell 2.1</div>
                    </div>
                    <div style={{ borderRadius: '12px', marginTop: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                        <div>Cell 2.2</div>
                    </div>
                </div>

                <div className="col" style={{ borderRadius: '12px', margin: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="form-control"
                            inline
                        />
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-6" style={{ marginInlineStart: '15px' }}>

                <div className="row">
                <div className="col" style={{ borderRadius: '12px', marginInlineEnd: '7.5px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div>Cell 4</div>
                </div>
                <div className="col" style={{ borderRadius: '12px', marginInlineStart: '7.5px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div>Cell 5</div>
                </div>
                </div>

                </div>

                <div className="col" style={{ borderRadius: '12px', marginInlineStart: '15px', marginInlineEnd: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div>Cell 6</div>
                </div>
            </div>
        </div>
    );
};

export default LayoutComponent;
