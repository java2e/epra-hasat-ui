import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from "primereact/image";
import { UserService } from '../../service/UserService';
import { Toast } from 'primereact/toast';
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
import { Link } from 'react-router-dom'

const Login = (props) => {

    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const toastBR = useRef(null);
    const userNameRef = useRef();
    const [password, setPassword] = useState('');

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            usernameOrEmail: userNameRef.current.value,
            password: password
        }


        const userService = new UserService();
        debugger
        const response = userService.login(data);
        response.then(res => {
            
            const expirationTime = new Date(
                new Date().getTime() + 3000 * 1000
            );
            authCtx.login(res, expirationTime.toISOString());
    
        },
        res =>{
            toastBR.current.show({ severity: 'error', summary: 'Hata', detail: "Kullanıcı adı veya şifre hatalı!", life: 10000});
        }
        )
        
    }


    return (

        <div className="form-box">
            <div className="header-text">
            
                <div style={{ margin: 'auto' }}>
                    <center>
                        <Image src="assets/layout/images/logo-1.png" alt="galleria" width={'80%'} height={'50%'} />
                        <h2 style={{color:"white"}} >Kullanıcı Girişi</h2>
                    </center>
                </div>
            </div>
            <center>
                <div className="field"  >
                    <span className="p-float-label" >
                        <InputText id="username" type="text" ref={userNameRef} placeholder="Kullanıcı Adı" style={{ width: '70%', fontSize: 14 }} />
                    </span>
                </div>
                <div className="field" >
                    <span className="p-float-label">
                        <InputText id="password" type="password" value={password} placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} style={{fontSize: 14, width: '70%' }} />
                    </span>
                </div>
                <Button onClick={loginSubmitHandler}  label="Giriş" style={{ backgroundColor:"#6366F1", width: '50%', fontSize: 14}}></Button> <br /><br />
                <div>
                
                <Button className="p-button-help p-button-text" aria-label="Şifremi Unuttum" label="Şifremi Unuttum" style={{backgroundColor:"#A855F7", color:"white", width: '50%', fontSize: 12}}onClick={() => history.push('/forgotPass')}/>
                

                </div>
                <div> </div>
                <Toast ref={toastBR} style={{width: "300px", height: "200px", fontSize: 16}}/>
            </center>
        </div>
    )

}

export default Login;
