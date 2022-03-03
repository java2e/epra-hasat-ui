import React, { useContext, useState } from "react"
import MainPage from "./pages/MainPage";
import { Route } from "react-router-dom";
import Login from "./pages/User/Login";

import AuthContext from "./store/auth/auth-context";


const App = () => {

    const authCtx = useContext(AuthContext);

    const [login, setLogin] = useState(false);


    const btnClick = () => {
        setLogin(current => !current);
    }


    return (
        <div>
            {!authCtx.isLoggedIn && <Login btnClick={btnClick} />}
            {authCtx.isLoggedIn && <MainPage />}
        </div>
    )
}

export default App;