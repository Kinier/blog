import React, {useState, useRef} from "react";
import {useNavigate} from "react-router-dom"
import userApi from "./userApi";

function RegisterForm({cookie: cookie, setCookie: setCookie}){

    const [formInputs, setFormInputs] = useState({username: "" ,email: "",password: ""})
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    

    const handleFormInputs = async (e)=>{

        const inputName = e.target.name
        const inputValue = e.target.value
        console.log({...formInputs, [inputName]: inputValue})
        setFormInputs({...formInputs, [inputName]: inputValue})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
            const answer = await userApi.register(formInputs, cookie   )
            if (answer?.error){
                setErrorMessage(answer?.error)
            }else{
                setErrorMessage(answer?.error)
                setCookie("jwt", answer)
                navigate("/profile")
            }
            
            console.log(answer)
    }

    return (
        <div className="form-wrapper flex w-full items-center justify-center h-full">
            <form onSubmit={handleSubmit} className="flex flex-col  main-background-color   w-2/6">
                <input type={"text"} placeholder="Имя пользователя" name="username" value={formInputs.username || ""} onChange={handleFormInputs}></input>
                <input type={"email"} placeholder="Почта" name="email" value={formInputs.email || ""} onChange={handleFormInputs}></input>
                <input type={"password"} placeholder="Пароль" name="password" value={formInputs.password || ""} onChange={handleFormInputs}></input>
                <span className="flex w-full justify-center items-center">{errorMessage}</span>
                <input type={"submit"}></input>
            </form>
            
        </div>
    )
}

export default RegisterForm