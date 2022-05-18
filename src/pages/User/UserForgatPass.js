import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from "primereact/image";
import { UserService } from '../../service/UserService';
import AuthContext from '../../store/auth/auth-context';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../../assets/demo/flags/flags.css';
import '../../assets/demo/Demos.scss';
import '../../assets/layout/layout.scss';
import '../../App.scss';
import './login.css';
import { Redirect, useHistory } from 'react-router-dom';
import { Toast } from 'primereact/toast';

const UserForgatPass = (props) => {

    const toast = useRef(null);
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const userNameRef = useRef();

    const resetPassSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            email: userNameRef.current.value,
           
        }

        const userService = new UserService();
        debugger
         userService.forgotPass(data).then(res=>{
            if(res.data.success==true) {
                toast.current.show({ severity: res.data.success, summary: 'Successful', detail: res.data.message, life: 5000 })                
               //@todo yönlendirme               

             }else{
                toast.current.show({ severity: res.data.success, summary: 'ERROR', detail: res.data.message, life: 5000 });             
   
             }  
         });
          
    
    }


    return (
        <div>  <Toast ref={toast} />  
        <div className="form-box" >                     
            <div className="header-text">
                <div style={{ margin: 'auto' }}>
                    <center>
                        <Image src="assets/layout/images/logo-1.png" alt="galleria" width={'80%'} height={'50%'} />
                        <h3 style={{color:"white"}}>Şifre Sıfırla</h3>
                    </center>
                </div>
            </div>
            <center>
                <div className="field"  >
                    <span className="p-float-label" >
                        <InputText id="username" type="text" ref={userNameRef} placeholder="Username" style={{ width: '70%' }} />
                    </span>
                </div>
                <Button className="p-button-help" onClick={resetPassSubmitHandler} label="Şifre Sıfırla" style={{ width: '50%' }}></Button> <br /><br /><br />
                <Button label="Login" className="p-button-text" onClick={() => history.push('/login')} />
            </center>
        </div>
        </div>
    )

}

export default UserForgatPass;
