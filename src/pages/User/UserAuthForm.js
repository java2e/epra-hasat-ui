
import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import { AutoComplete } from 'primereact/autocomplete';
import { Divider } from 'primereact/divider';


const UserAuthForm = (props) => {


    const { users } = props;
    const { feeders } = props;
    const { feederUserPath } = props;    
    const [picklistSourceValue, setPicklistSourceValue] = useState(feeders);
    const [picklistTargetValue, setPicklistTargetValue] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [selectedUser, setSelectedUserValue] = useState(null);
    
    useEffect(()=>{
        if (feederUserPath.user?.id){
            clearData();
            setSelectedUserValue(feederUserPath.user);
            setPicklistTargetValue(prev =>[...feederUserPath.feeder] );            
            feederUserPath.feeder.forEach(item =>{                      
                setPicklistSourceValue(prev => prev.filter((fee) => fee.id !==item.id));   
            });
        }else{
            setPicklistSourceValue(feeders);
            setPicklistTargetValue([]);
        }


    },[props,feederUserPath])

    const clearData = () =>{  
                
        setSelectedUserValue(feederUserPath.user);
        setPicklistSourceValue(feeders);
        setPicklistTargetValue([]);
        setSelectedUserValue(null);
    }



    const searchUser = (event) => {
         
        setTimeout(() => {
            
            let _filteredUsers;
            if (!event.query.trim().length){
                _filteredUsers = [...users];
            }
            else {
                _filteredUsers = users.filter((user) => {
                    
                    return  user.name.toLowerCase().startsWith(event.query.toLowerCase()) || user.surname.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }           
            setFilteredUsers(_filteredUsers);
           
        }, 250) ;
       
    }
    const itemTemplate = (item) => {
        const nameSurname= item.name+' '+item.surname;
        return (
            <div className="country-item">
                <div>{nameSurname}</div>
            </div>
        );
    }

    const saveData = () => {
        feederUserPath.userId = selectedUser.id;         
        feederUserPath.feeder = picklistTargetValue;
        props.save();
    }


    const selectedUserHandler =(data) => {    
                     /// @todo süreki sorgu atıyo 
        props.editFeederUserPAth(data.value.id);
    
    }

    return (
        <div className="col-12">
            <div className="col-12 lg:col-8">
                <div className="card">
                    <h5>Kullanıcı Bilgisi</h5>
                    <AutoComplete value={selectedUser} suggestions={filteredUsers} completeMethod={searchUser} field="name" dropdown forceSelection
                        itemTemplate={itemTemplate} onChange={(e) => setSelectedUserValue(e.value)} onSelect={selectedUserHandler}/>
                    <h5>Fider Listesi</h5>
                    <PickList source={picklistSourceValue} target={picklistTargetValue} sourceHeader="Fiderler" targetHeader="Yetkiler" itemTemplate={(item) => <div>{item.name}</div>}
                        onChange={(e) => { setPicklistSourceValue(e.source); setPicklistTargetValue(e.target) }} sourceStyle={{ height: '200px' }} targetStyle={{ height: '200px' }}></PickList>
                    <Divider />   
                    <div className='field'>
                    <Button label="Temizle"  onClick={clearData} className="p-button-warning" style={{b:'orange' }}></Button>
                    <Button label="Ekle / Güncelle" onClick={saveData}  style={{float:'right'}}></Button>
                    </div>                 
                    


                </div>
            </div>
        </div>

    )
}

export default UserAuthForm;