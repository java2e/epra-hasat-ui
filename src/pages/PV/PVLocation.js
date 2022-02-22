import React, {useRef} from 'react';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import GoogleMap from './GoogleMap';
import BarChart from './BarChart';


const PVLocation = (props) => {


    return(

        <div className="col-12">
        <div className="card">
            <h5>PV Location Optimization</h5>
            <div className="grid">
                <div className="col-4 flex align-items-center justify-content-center">
                    <div className="p-fluid">
                        
                    </div>
                </div>
                <div className="col-1">
                    <Divider layout="vertical">
                    </Divider>
                </div>
                <div className="col-6 align-items-center justify-content-center">
                    
                    <GoogleMap />

                    <Divider layout="horizontal" align="center" />

                    <BarChart />

                    <Divider align="right">
                    </Divider>

                    <p>Annual demand of feeder is 120 GWh.</p>
                    <p>Peak load of feeder is XXX MW.</p>
                    <p>PV installed capacity is XXX MW.</p>
                    <Divider align="right">
                        <Button label="Execute" icon="pi pi-search" className="p-button-outlined"></Button>
                    </Divider>
                </div>
            </div>
        </div>
    </div>

    )
}

export default PVLocation;