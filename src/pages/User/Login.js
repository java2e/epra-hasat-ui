import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Image } from "primereact/image";
import { UserService } from '../../service/UserService';

const Login = (props) => {

    const userNameRef = useRef();
    const [password,setPassword] = useState('');

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            usernameOrEmail: userNameRef.current.value,
            password: password
        }

        debugger
        const userService = new UserService();

        const response = userService.login(data);

        response.then(res => {
            debugger
        })

        debugger

    }


    return (
        <div style={{ margin: 'auto', width: '90%', padding: '10rem' }}>

            <div className="col-12">
                <div style={{ margin: 'auto' }}>
                    <center>
                        <Image src="assets/layout/images/logo-1.png" alt="galleria" width={'20%'} height={'10%'} />
                        <h5>Kullanıcı Girişi</h5>
                    </center>
                </div>

                <div className="card">
                    <div className="grid">
                        <div className="col-5 flex align-items-center justify-content-center">
                            <div className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="username" type="text" ref={userNameRef} />
                                        <label htmlFor="username">Username</label>
                                    </span>
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label htmlFor="password">Password</label>
                                    </span>
                                </div>
                                <Button onClick={loginSubmitHandler} label="Login"></Button>
                                <Button label="Şİfremi Unuttum!" className="p-button-secondary p-button-text mr-2 mb-2" />

                            </div>
                        </div>
                        <div className="col-1">
                            <Divider layout="vertical" />
                        </div>
                        <div className="col-5 align-items-center justify-content-center">
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>

                            <Divider layout="horizontal" align="center" />


                            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                                voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur
                                a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
                                doloribus asperiores repellat.
                                Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien.
                                Morbi dapibus luctus odio.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'fixed', left: '0', bottom: '0', width: '100%', height: '40%' }}>
                <Image src="images/pages/footer.jpg" alt="galleria" width={'100%'} height={'100%'} />
            </div>
        </div>

    )

}

export default Login;