import React, {useContext} from 'react';
import MyInput from "../components/UI/Input/MyInput";
import MyButton from "../components/UI/Button/MyButton";
import {AuthContext} from "../Context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>Page for login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder='Enter a login'/>
                <MyInput type="password" placeholder='Enter a password'/>
                <MyButton>Join to app</MyButton>
            </form>
        </div>
    );
};

export default Login;