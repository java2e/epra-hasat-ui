/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from './GoogleMaps';
import { UserService } from '../../service/UserService';
import { FeederService } from '../../service/FeederService';
const GoogleMap = (props) => {
    const [overlays, setOverlays] = useState(null);
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [feederLine, setFeederLine] = useState([]);
    const [baraList, setBaraList] = useState([]);
    const [pvList, setPvList] = useState([]);
    const userService = new UserService();
    const feederService = new FeederService();
    const [feeder,setFeeder] = useState('');
    const {feederId,pvs} = props;

    const [pvss, setPvss]= useState([]);

    useEffect(() => {
        const data = async () => {
            
           
            const resFeederId = await feederService.getFeederById(feederId);
              
            if(resFeederId.success) {
                    const data = resFeederId.object;
                    setFeeder(data);

            }

            const res = await userService.getFeederBaraLineList(props.feederId);
            if (res.success) {
                const data = res.object;
                let lineListe = [];
                for (const item in data.lineList) {
                    const line = new google.maps.Polyline({
                        path: [
                            { lat: parseFloat(data.lineList[item].x1), lng: parseFloat(data.lineList[item].y1) },
                            { lat: parseFloat(data.lineList[item].x2), lng: parseFloat(data.lineList[item].y2) }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 3
                    });

                    setFeederLine(prev => [...prev, line]);
                }
                for (const item2 in data.baraList) {
                    if (data.baraList[item2].trafoMerkezi){                        
                        const bara =new google.maps.Marker({position: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)},icon: "./TM_30.png",  title: data.baraList[item2].name});
                        setBaraList(prev => [...prev, bara]);
                    }else{
                     const bara =new google.maps.Marker({position: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)},icon: "./icon_map_red_10.png",  title: data.baraList[item2].name});
                     setBaraList(prev => [...prev, bara]);
                    }
                    
                }

                debugger
                for (const key in props.pvs) {

                    debugger

                    const pvXY = new google.maps.Marker({position: {lat: parseFloat(props.pvs[key].x), lng: parseFloat(props.pvs[key].y)},icon: "./icon_map_blue_triangle_20.png", title:props.pvs[key].name});
                    setPvss(prev=>[...prev, pvXY]);

            
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


    }, [feederId])

    const options = {
        center: { lat: parseFloat(feeder.x), lng: parseFloat(feeder.y) },
        zoom: 10
    };




    const onMapReady = (event) => {
        
     
        setOverlays(
            [   
                ...baraList,
                ...feederLine,
                ...pvss
           
            ]
        );
      
    }



    return (
        <div>
            {
                googleMapsReady && (
                    <div id="google-map">
                         <GMap overlays={overlays} options={options} style={{ width: '100%', minHeight: '300px' }} onMapReady={onMapReady} />
                        
                    </div>
                )
            }
        </div>
    );
}
export default GoogleMap;
