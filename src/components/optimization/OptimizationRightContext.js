import React, { useEffect, useState } from 'react';

import BarChart from "./BarChart";
import GoogleMap from "./GoogleMap";

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { PVLocationService } from '../../service/PVLocation/PVLocationService';
import { ProgressSpinner } from 'primereact/progressspinner';


const OptimizationRightContext = (props) => {
    const emptyFeederInfo = {
        demand: '',
        load: '',
        totalPvInsCap: ''
    }

    const emptyData = {
        label: [],
        activePower: []
    }


    const pvLocationService = new PVLocationService();
    const [feederInfo, setFeederInfo] = useState(emptyFeederInfo);
    const [barChartData, setBarChartData] = useState(emptyData);
    const [loading, setLoading] = useState(false);

    const { feederId } = props;


    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            const res = await pvLocationService.getFeederInfo(feederId);
            if (res.success) {
                setFeederInfo(res.object);
            }
            else {

            }

            const resAnnualLoadList = await pvLocationService.getFeederAnnualLoadChart(feederId);

            if (resAnnualLoadList.success) {

                setBarChartData(resAnnualLoadList.object);
            }


        }

        loadData().then(res => {
            setLoading(false);
        });



    }, [feederId])

    const loadingItem = <div>
        <h5>Harita yükleniyor....</h5>
        <ProgressSpinner />
    </div>


    return (
        <div>

            {loading && loadingItem}
            {!loading && <GoogleMap />}

            <Divider layout="horizontal" align="center" />
            <BarChart data={barChartData} />
            <Divider align="right">
            </Divider>

            <p>Annual demand of feeder is <span><b>{feederInfo?.demand} </b></span>GWh.</p>
            <p>Peak load of feeder is <span><b>{feederInfo?.load}</b></span> MW.</p>
            <p>PV installed capacity is <span><b>{feederInfo?.totalPvInsCap}</b></span> MW.</p>

        </div>
    )
}

export default OptimizationRightContext;