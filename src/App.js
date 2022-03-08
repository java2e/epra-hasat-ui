import React, { useContext, useState,useRef } from "react"
import MainPage from "./pages/MainPage";
import { Route } from "react-router-dom";
import Login from "./pages/User/Login";
import { Toast } from "primereact/toast";
import AuthContext from "./store/auth/auth-context";


const App = () => {

    const authCtx = useContext(AuthContext);
    const toast = useRef(null);
    const [login, setLogin] = useState(false);


    const btnClick = () => {
        setLogin(current => !current);
    }


    return (
        <div>
            <Toast ref={toast} />
            {!authCtx.isLoggedIn && <Login btnClick={btnClick} />}
            {authCtx.isLoggedIn && <MainPage />}
        </div>
    )
}

export default App;