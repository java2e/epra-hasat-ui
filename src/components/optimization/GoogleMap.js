/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from './GoogleMaps';
import { UserService } from '../../service/UserService';
const GoogleMap = () => {
    const [overlays, setOverlays] = useState(null);
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [feederLine, setFeederLine] = useState([]);
    const [baraList, setBaraList] = useState([]);

    const userService = new UserService();



    useEffect(() => {
        const data = async () => {
            const res = await userService.getFeederBaraLineList(1);
            if (res.success) {

                const data = res.object;

                let lineListe = [];

                for (const item in data.lineList) {

                    const latLan = {
                        lat: parseFloat(data.lineList[item].x1),
                        lng: parseFloat(data.lineList[item].y1)
                    }
                    const latLan2 = {
                        lat: parseFloat(data.lineList[item].x2),
                        lng: parseFloat(data.lineList[item].y2)
                    }
                    setFeederLine(prev => [...prev, latLan, latLan2]);

                }

                for( const item2 in data.baraList) {

                    const bara =  new google.maps.Circle({center: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 100});
                   // const bara =new google.maps.Marker({position: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)}, title: data.baraList[item2].name});
                    setBaraList(prev => [...prev,bara]);
                }
                setGoogleMapsReady(true);
            }


        }

        data();

        loadGoogleMaps(() => {

        });
        return () => {
            removeGoogleMaps();
        }


    }, [])

    const options = {
        center: { lat: 39.014249, lng: 34.108842 },
        zoom: 7
    };




    const onMapReady = (event) => {
        
        setOverlays(
            [
                ...baraList,
                new google.maps.Polyline({ path: feederLine, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
            ]
        );
    }



    return (
        <div>
            {
                googleMapsReady && (
                    <div>
                        <GMap overlays={overlays} options={options} style={{ width: '100%', minHeight: '320px' }} onMapReady={onMapReady} />
                    </div>
                )
            }
        </div>
    );
}


export default GoogleMap;