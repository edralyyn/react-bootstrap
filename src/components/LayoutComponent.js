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

const LayoutComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    const cellStyle = {
        borderRadius: '12px',
        margin: '15px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    };

    const dividedCell = {
        borderRadius: '12px',
        marginTop: '15px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    };

    const miniCell = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        position: 'relative',
        zIndex: 2,
    };

    const miniCellText = {
        marginLeft: '10px',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#f3f3f3',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
        height: '100px',
        width: '200px',
    };

    const glbContainerStyle = {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        width: 'calc(100% - 300px)',
        height: 'calc(100% - 20px)',
        display: 'flex',
        justifyContent: 'flex-end',
    };

    const datePickerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    };

    const canvasStyle = {
        width: '100%',
        height: '100%',
    };

    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col-6" style={cellStyle}>
                    <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                        <div className="row" style={{ flex: 1 }}>
                            <div className="col-12">
                                <div style={miniCell}>
                                    <Canvas style={{ width: '100px', height: '100px' }}>
                                        <ambientLight intensity={0.5} />
                                        <Suspense fallback={null}>
                                            <Model path="processor.glb" />
                                        </Suspense>
                                        <OrbitControls enableZoom={false} />
                                    </Canvas>
                                    <div style={miniCellText}>TEXT HERE</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div style={miniCell}>
                                    <Canvas style={{ width: '100px', height: '100px' }}>
                                        <ambientLight intensity={0.5} />
                                        <Suspense fallback={null}>
                                            <Model path="ram.glb" />
                                        </Suspense>
                                        <OrbitControls enableZoom={false} />
                                    </Canvas>
                                    <div style={miniCellText}>TEXT HERE</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div style={miniCell}>
                                    <Canvas style={{ width: '100px', height: '100px' }}>
                                        <ambientLight intensity={0.5} />
                                        <Suspense fallback={null}>
                                            <Model path="hdd.glb" />
                                        </Suspense>
                                        <OrbitControls enableZoom={false} />
                                    </Canvas>
                                    <div style={miniCellText}>TEXT HERE</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div style={miniCell}>
                                    <Canvas style={{ width: '100px', height: '100px' }}>
                                        <ambientLight intensity={0.5} />
                                        <Suspense fallback={null}>
                                            <Model path="gpu.glb" />
                                        </Suspense>
                                        <OrbitControls enableZoom={false} />
                                    </Canvas>
                                    <div style={miniCellText}>TEXT HERE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={glbContainerStyle}>
                        <Canvas style={canvasStyle} camera={{ position: [30, 0, 20], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <Suspense fallback={null}>
                                <Model path="gaming_desktop_pc.glb" />
                            </Suspense>
                            <OrbitControls enableZoom={true} />
                        </Canvas>
                    </div>
                </div>

                <div className="col-3">
                    <div className="row" style={dividedCell}>
                        <div>
                            Cell 2.1
                        </div>
                    </div>
                    <div className="row" style={dividedCell}>
                        <div>
                            Cell 2.2
                        </div>
                    </div>
                </div>

                <div className="col" style={cellStyle}>
                    <div style={datePickerContainerStyle}>
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
                <div className="col" style={cellStyle}>
                    <div>Cell 4</div>
                </div>
                <div className="col" style={cellStyle}>
                    <div>Cell 5</div>
                </div>
                <div className="col-6" style={cellStyle}>
                    <div>Cell 6</div>
                </div>
            </div>
        </div>
    );
};

export default LayoutComponent;
