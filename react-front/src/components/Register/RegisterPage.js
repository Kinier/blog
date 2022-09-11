import React, {useEffect} from "react";
import RegisterForm from './RegisterForm'
import {useNavigate} from "react-router-dom"

function RegisterPage ({cookie: cookie, setCookie: setCookie}){
    const navigate = useNavigate()
    
        useEffect(()=>{
            if (cookie?.jwt){
                navigate("/")
            }
        }, [])


    return (
        <div className="flex flex-col font-mono"  >




            <div className="main-content">
                <RegisterForm cookie={cookie} setCookie={setCookie}/>
            </div>




        </div>
    )
}

export default RegisterPage