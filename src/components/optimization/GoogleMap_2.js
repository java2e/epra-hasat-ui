/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from './GoogleMaps';
import { UserService } from '../../service/UserService';
import { FeederService } from '../../service/FeederService';
import { Divider } from "primereact/divider";
import { Avatar } from 'primereact/avatar';
import { OptimizationService } from '../../service/OptimizationService';
const GoogleMap = (props) => {
    const [overlays, setOverlays] = useState(null);
    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [feederLine, setFeederLine] = useState([]);
    const [baraList, setBaraList] = useState([]);
    const [pvList, setPvList] = useState([]);
    const [pv, setPv] = useState([]);
    const userService = new UserService();
    const feederService = new FeederService();
    const [feeder,setFeeder] = useState('');
    const [optimumPv,setOptimumPv] = useState('');
    const [oPv,setOPv] = useState('');
    const {feederId,processId} = props;
    const [optimizationList, setOptimizationList] = useState([]);
    const optimizationService = new OptimizationService();
    const [loading,setLoading] = useState(false);
    const [pvss, setPvss]= useState([]);
    

    useEffect(() => {
        const data = async () => {
            
           
            const resFeederId = await feederService.getFeederById(feederId);
              
            if(resFeederId.success) {
                    const data = resFeederId.object;
                    setFeeder(data);
                   
                
            }

            if(processId){ //PV Result

                try {
                    const resOptimumFeederPV = await feederService.getOptimumFeederInPv(feederId,processId);

              
                if(resOptimumFeederPV.success) {
                        const dataBlue = resOptimumFeederPV.object[0];
                        const dataYellow = resOptimumFeederPV.object[1];

                                             
                        for(const key in dataBlue){                    
                            const pvXY = new google.maps.Marker({position: {lat: parseFloat(dataBlue[key].x), lng: parseFloat(dataBlue[key].y)},icon: "./icon_map_blue_triangle_20.png", title:dataBlue[key].name});
                           // console.log(pvXY)
                            setPv(prev => [...prev,pvXY]);
                    
                        }   
                        for(const key in dataYellow){                    
                            const pvXY = new google.maps.Marker({position: {lat: parseFloat(dataYellow[key].x), lng: parseFloat(dataYellow[key].y)},icon: "./icon_map_yellow_triangle_20 copy.png", title:dataYellow[key].name});
                           // console.log(pvXY)
                            setPv(prev => [...prev,pvXY]);
                    
                        }    
                } 
                
                } catch (error) {
                    console.log(error)
                }
                

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
                        const image = {
                            url: "./TM_test.png",
                            size: new google.maps.Size(45, 45),
                            origin: new google.maps.Point(0,-15),
                            anchor: new google.maps.Point(15,15)
                        };                       
                        const bara =new google.maps.Marker({position: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)},icon: image,  title: data.baraList[item2].name});
                        setBaraList(prev => [...prev, bara]);
                    }else{
                     const bara =new google.maps.Marker({position: {lat: parseFloat(data.baraList[item2].x), lng:  parseFloat(data.baraList[item2].y)},icon: "./icon_map_red_10.png",  title: data.baraList[item2].name});
                     setBaraList(prev => [...prev, bara]);
                    }
                    
                }
                if(props.pvs){//RP Result 
                for (const key in props.pvs) {  
                    const pvXY = new google.maps.Marker({position: {lat: parseFloat(props.pvs[key].x), lng: parseFloat(props.pvs[key].y)},icon: "./icon_map_blue_triangle_20.png", title:props.pvs[key].name});
                    setPv(prev=>[...prev, pvXY]);
                }
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
    let zoomlevel = 10
    if(feederId==1){
        zoomlevel = 10
    }else if(feederId == 2){
        zoomlevel = 9
    }else if(feederId == 3){
        zoomlevel = 9
    }else if(feederId == 4){
        zoomlevel = 9
    }else if(feederId == 5){
        zoomlevel = 9
    }else if(feederId == 6){
        zoomlevel = 10
    }else if(feederId == 7){
        zoomlevel = 13
    }else if(feederId == 8){
        zoomlevel = 9
    }
    else if(feederId == 9){
        zoomlevel = 11
    }else if(feederId == 10){
        zoomlevel = 10
    }
    else if(feederId == 11){
        zoomlevel = 9
    }else if(feederId == 12){
        zoomlevel = 11
    }
    else if(feederId == 13){
        zoomlevel = 12
    }else{
        zoomlevel = 10
    }

    const options = {
        center: { lat: parseFloat(feeder.x), lng: parseFloat(feeder.y) },
        zoom: zoomlevel
    };




    const onMapReady = (event) => {

        
     
        setOverlays(
            [   
                ...baraList,
                ...feederLine,
                ...pv
           
            ]
        );
      
    }

    

    return (
        <div>
            {
                googleMapsReady && (
                    <div id="google-map">
                         <GMap overlays={overlays} options={options} style={{ width: '100%', minHeight: '300px' }} onMapReady={onMapReady} />
                         <Divider layout="horizontal" align="center" />
                          <div>
                          <img src="./icon_map_blue_triangle_20.png" />  Reaktif Güç Desteği Alınan PV'ler
                         </div>
                    </div>
                    
                )
            }
        </div>
        
    );
}
export default GoogleMap;
