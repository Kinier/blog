import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Header({ cookie: cookie }) {
    const navigate = useNavigate()
    const prevScrollPos = useRef("0")
    const handleHomePage = () => {
        navigate('/')
    }
    const handleNewPostPage = () => {
        navigate('/newPost')
    }
    const handleProfile = () => {

        navigate(cookie?.jwt ? "/profile" : "/notlogged")
    }


    window.addEventListener("scroll", ()=>{
        const currentScrollPos = window.scrollY;

        console.log(currentScrollPos)
        if (prevScrollPos.current > currentScrollPos) { // up
            showHeader()
        } 
        if (prevScrollPos.current < currentScrollPos) {
            hideHeader()
        }
        prevScrollPos.current = currentScrollPos;
    })


    function showHeader(){
        document.querySelector(".header").style.height = "2.5rem"
    }

    function hideHeader(){
        document.querySelector(".header").style.height = "0rem"

    }

    return (
        <div className="flex flex-col items-center">
            <div className="header bg-slate-500 rounded-xl bg-opacity-20">
                <div className="cursor-pointer" onClick={handleHomePage}>kinier's blog</div>
                <div className="cursor-pointer" onClick={handleNewPostPage}>Новый пост</div>
                <div className="cursor-pointer" onClick={handleProfile}>{cookie?.jwt ? "My profile" : "Sign up/in"}</div>
            </div>
        </div>
    )
}

export default Header