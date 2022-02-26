import React, { useState } from "react"
import MainPage from "./pages/MainPage";
import { Route } from "react-router-dom";
import Login from "./pages/User/Login";


const App = () => {

    const [login, setLogin] = useState(false);


    const btnClick = () => {
        setLogin(current => !current);
    }


    return (
        <div>
            {!login && <Login btnClick={btnClick} />}
            {login && <MainPage />}
        </div>
    )
}

export default App;