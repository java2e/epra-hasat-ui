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
import { Link } from 'react-router-dom'

const Login = (props) => {

    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const userNameRef = useRef();
    const [password, setPassword] = useState('');

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            usernameOrEmail: userNameRef.current.value,
            password: password
        }


        const userService = new UserService();

        const response = userService.login(data);
          
        response.then(res => {
            const expirationTime = new Date(
                new Date().getTime() + 3000 * 1000
            );
            authCtx.login(res, expirationTime.toISOString());
    
        })
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
                        <InputText id="username" type="text" ref={userNameRef} placeholder="Username" style={{ width: '70%' }} />
                    </span>
                </div>
                <div className="field" >
                    <span className="p-float-label">
                        <InputText id="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={{ width: '70%' }} />
                    </span>
                </div>
                <Button onClick={loginSubmitHandler}  label="Giriş" style={{ width: '50%' }}></Button> <br /><br /><br />
                <div>
                
                <Button className="p-button-help p-button-text" aria-label="Şifremi Unuttum" label="Şifremi Unuttum" onClick={() => history.push('/forgotPass')}/>
            

                </div>
                
            </center>
        </div>
    )

}

export default Login;
