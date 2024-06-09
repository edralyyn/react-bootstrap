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

const LayoutComponent = () => {
    return (
        <div className="container-fluid text-center" style={{ marginTop: '0px' }}>
            <div className="row">
            <div className="col-6" style={{ borderRadius: '12px', margin: '15px', padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Cell1 />
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
