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

        debugger

        response.then(res => {
            const expirationTime = new Date(
                new Date().getTime() + 3000 * 1000
            );
            authCtx.login(res.accessToken, expirationTime.toISOString());
    
        })
    }


    return (

        <div className="form-box">
            <div className="header-text">

                <div style={{ margin: 'auto' }}>
                    <center>
                        <Image src="assets/layout/images/logo-1.png" alt="galleria" width={'80%'} height={'50%'} />
                        <h3>Kullanıcı Girişi</h3>
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
                <Button onClick={loginSubmitHandler} label="Login" style={{ width: '50%' }}></Button> <br />
                <Button label="Şifremi Unuttum!" className="p-button-secondary p-button-text mr-2 mb-2" />
            </center>
        </div>
    )

}

export default Login;
