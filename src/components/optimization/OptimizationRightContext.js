import React from 'react';

import BarChart from "./BarChart";
import GoogleMap from "./GoogleMap";

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';


const OptimizationRightContext = (props) => {

    debugger
    const { feederInfo, barChartData, loading, loadingItem } = props;


    return (
        <div className="col-6 align-items-center justify-content-center">

            {loading && loadingItem}
            {!loading && <GoogleMap />}

            <Divider layout="horizontal" align="center" />
            <BarChart data={barChartData} />
            <Divider align="right">
            </Divider>

            <p>Annual demand of feeder is <span><b>{feederInfo.demand} </b></span>GWh.</p>
            <p>Peak load of feeder is <span><b>{feederInfo.load}</b></span> MW.</p>
            <p>PV installed capacity is <span><b>{feederInfo.totalPvInsCap}</b></span> MW.</p>
            <Divider align="right">
                <Button label="Execute" icon="pi pi-search" className="p-button-outlined"></Button>
            </Divider>
        </div>
    )
}

export default OptimizationRightContext;