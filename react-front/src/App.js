import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NoPage from "./components/Errors/NoPage";
import HomePage from "./components/Home/HomePage";
import ProfilePage from './components/Profile/ProfilePage';
import RegisterPage from './components/Register/RegisterPage';
import { useCookies } from 'react-cookie';
import LoginPage from './components/Login/LoginPage';
import NotLogged from "./components/Errors/NotLoggedPage";
import NewPostPage from './components/Post/NewPostPage';
import Header from './components/Header';
import PostPage from "./components/Post/PostPage"
import UserInfoPage from "./components/Profile/UserInfoPage";
import AdminPage from "./components/Admin/AdminPage";

function App() {
    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);


    return (
        <div className="w-full h-full flex flex-col font-mono text-base ">
            <BrowserRouter>


                <Header cookie={cookie} />

                <Routes>

                    <Route path="/" element={<HomePage cookie={cookie} />} />
                    <Route path="/register" element={<RegisterPage cookie={cookie} setCookie={setCookie} />} />
                    <Route path="/login" element={<LoginPage cookie={cookie} setCookie={setCookie} />} />
                    <Route path='/profile' element={<ProfilePage cookie={cookie} setCookie={setCookie} removeCookie={removeCookie} />} />
                    <Route path="/notlogged" element={<NotLogged cookie={cookie} />} />
                    <Route path="/newPost" element={<NewPostPage cookie={cookie} removeCookie={removeCookie} />} />
                    <Route path="/post/:postId" element={<PostPage cookie={cookie}  />} />
                    <Route path="/users/:userId" element={<UserInfoPage />} />
                    <Route path={'/admin'} element={<AdminPage cookie={cookie}/>}/>
                    <Route path="*" element={<NoPage />} />

                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
