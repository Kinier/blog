import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NoPage from "./components/NoPage";
import Home from "./components/Home";
import Profile from './components/Profile';
import RegisterPage from './components/RegisterPage';
import { useCookies } from 'react-cookie';
import LoginPage from './components/LoginPage';
import NotLogged from "./components/NotLoggedPage";
import NewPostPage from './components/NewPostPage';
import Header from './components/Header';
import PostPage from "./components/PostPage"

function App() {
    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);


    return (
        <div className="w-full h-full flex flex-col font-mono text-base ">
            <BrowserRouter>


                <Header cookie={cookie} />

                <Routes>

                    <Route path="/" element={<Home cookie={cookie} />} />
                    <Route path="/register" element={<RegisterPage cookie={cookie} setCookie={setCookie} />} />
                    <Route path="/login" element={<LoginPage cookie={cookie} setCookie={setCookie} />} />
                    <Route path='/profile' element={<Profile cookie={cookie} setCookie={setCookie} removeCookie={removeCookie} />} />
                    <Route path="/notlogged" element={<NotLogged cookie={cookie} />} />
                    <Route path="/newPost" element={<NewPostPage cookie={cookie} removeCookie={removeCookie} />} />
                    <Route path="/post/:postId" element={<PostPage cookie={cookie}  />} />
                    <Route path="*" element={<NoPage />} />

                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
