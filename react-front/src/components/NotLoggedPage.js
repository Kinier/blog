import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function NotLogged({ cookie: cookie}) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (cookie?.jwt){
            navigate('/profile')
        }
    }, [cookie])

    return (
        <div className="flex flex-col w-full items-center mt-10">
            <ul className="flex flex-col bg-blacktext-zinc-100 border-none rounded-lg  main-background-color  w-4/6 items-center text-xl divide-y-8">
                <li className="flex">

                    <button type="button" className="flex hover:text-slate-100" onClick={()=>navigate('/register')}> Регистрация </button>
                </li>
                <li className="flex">

                    <button type="button" className="flex hover:text-slate-100" onClick={()=>navigate('/login')}> Войти </button>
                </li>
            </ul>
        </div>
    )
}


export default NotLogged