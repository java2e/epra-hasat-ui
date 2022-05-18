import React, { useContext, useState, useRef } from "react"
import MainPage from "./pages/MainPage";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/User/Login";
import { Toast } from "primereact/toast";
import AuthContext from "./store/auth/auth-context";
import UserForgatPass from "./pages/User/UserForgatPass";


const App = () => {

    const authCtx = useContext(AuthContext);
    const toast = useRef(null);
    const [login, setLogin] = useState(false);


    const btnClick = () => {
        setLogin(current => !current);
    }


    return (
        <div>
            <Switch>
            {!authCtx.isLoggedIn && (
                    <Route path='/login'>
                        <Login />
                    </Route>
                    
                    
                )}
                {!authCtx.isLoggedIn && (
                    <Route path='/forgotPass'>
                        <UserForgatPass />
                    </Route>  
                )}
                <Route path='/'>
                    {authCtx.isLoggedIn && <MainPage />}
                    {!authCtx.isLoggedIn && <Redirect to='/login' />}
                </Route>
                <Route path='*'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </div>
    )
}

export default App;