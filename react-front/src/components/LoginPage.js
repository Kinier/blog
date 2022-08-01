import React, {useEffect} from "react";
import Header from "./Header";
import RegisterForm from './RegisterForm'
import {useNavigate} from "react-router-dom"
import LoginForm from "./LoginForm"

function LoginPage ({cookie: cookie, setCookie: setCookie}){
    const navigate = useNavigate()
    
        useEffect(()=>{
            if (cookie?.jwt){
                navigate("/")
            }
        }, [])


    return (
        <div className="flex flex-col font-mono"  >

            {/* <Header /> */}



            <div className="main-content">
                <LoginForm cookie={cookie} setCookie={setCookie}/>
            </div>




        </div>
    )
}

export default LoginPage