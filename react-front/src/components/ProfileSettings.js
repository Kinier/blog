import React, { useState, useEffect } from "react";
import userApi from "./userApi";
import {Link, Route} from "react-router-dom";

function ProfileSettings({ cookie: cookie, setCookie: setCookie, removeCookie: removeCookie, profileData: profileData, setProfileData: setProfileData, isProfileSettingsLoaded: isProfileSettingsLoaded  }) {

    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)


    useEffect(() => {

        async function _() {
            const image = await userApi.getProfileAvatarByImageId(profileData?.profilePictureId)


            setAvatarPreview(image ? URL?.createObjectURL(image) : null)
        }
        if (profileData){
            _()
        }
    }, [isProfileSettingsLoaded])



    const handleExit = (element) => {
        removeCookie('jwt')
    }

    const handleSettings = (e) => {
        const inputName = e.target.name
        const inputValue = e.target.value
        setProfileData({ ...profileData, [inputName]: inputValue })
    }


    const handlePatchUserInfo = async (key) => {
        const answer = await userApi.patchUserInfo({ key: key, value: profileData[key], userId: profileData.id, cookie: cookie })
        setProfileData(answer.updatedUser)
    }

    const addAvatarToProfile = async (e) => {
        const answer = await userApi.addProfileAvatar({ profileId: profileData.id, avatar: avatar, cookie: cookie })
        console.log(answer)
    }

    const handleFileUpdate = (e) => { // todo prevent file preview rerender on text inputs changes
        if (e?.target?.files[0]) {
            setAvatarPreview(URL.createObjectURL(e.target.files[0]))
            setAvatar(e.target.files[0])
        }
    }

    return (
        <div className="flex flex-col w-full items-center">
            <ul className="flex flex-col border-none rounded-lg main-background-color w-4/6 items-center text-xl max-w-full">
                <li className="flex flex-row w-full my-2">
                    <div className="flex w-1/2  justify-end items-center mr-4">
                        Псевдоним
                    </div>

                    <input type={"text"} value={profileData?.username || ""} onChange={handleSettings} name="username" className="flex w-1/2  justify-center items-center opacity bg-transparent  resize-none">

                    </input>

                    <button className="flex " onClick={async () => handlePatchUserInfo("username")}>Изменить</button>
                </li>

                <li className="flex flex-row w-full my-2">
                    <div className="flex w-1/2 justify-end items-center mr-4">
                        Электронная почта
                    </div>

                    <input type={"email"} value={profileData?.email || ""} readOnly name="email" className="flex w-1/2 justify-center items-center opacity bg-transparent  resize-none">

                    </input>

                    <button className="flex " onClick={async () => handlePatchUserInfo("email")}>Изменить</button>
                </li>

                <li className="flex flex-row w-full my-2">
                    <div className="flex w-1/2 justify-end items-center mr-4">
                        Имя
                    </div>

                    <input type={"text"} value={profileData?.name || ""} onChange={handleSettings} name="name" className="flex w-1/2 justify-center items-center opacity bg-transparent resize-none">

                    </input>

                    <button className="flex " onClick={async () => handlePatchUserInfo("name")}>Изменить</button>
                </li>

                <li className="flex flex-row w-full my-2">
                    <div className="flex w-1/2 justify-end items-center mr-4">
                        Фамилия
                    </div>

                    <input type={"text"} value={profileData?.surname || ""} onChange={handleSettings} name="surname" className="flex w-1/2 justify-center items-center opacity bg-transparent  resize-none">

                    </input>

                    <button className="flex " onClick={async () => handlePatchUserInfo("surname")}>Изменить</button>
                </li>

                

                <li className="flex flex-row w-full my-2">
                    <div className="flex w-1/2 justify-end items-center mr-4 rounded-xl h-64 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('" + avatarPreview + "')" }}>
                        {avatarPreview ? "" :  "Место для фотографии профиля"}
                    </div>

                    <input type={"file"} onChange={handleFileUpdate} name="avatar" className="flex w-1/2 h-full justify-center items-center opacity bg-transparent  resize-none">

                    </input>

                    

                    <button className="flex items-center" onClick={addAvatarToProfile}>Изменить</button>
                </li>

                <li className="flex flex-row w-full  my-2 justify-between">
                    <div className="flex w-1/2 justify-end items-center mr-4" >
                        {profileData?.postsIds ? "Посты" : "Постов нет"}

                    </div>

                    <div className="flex w-1/2 justify-center items-center bg-opacity-0  opacity bg-transparent resize-none flex-col">
                        {profileData?.postsIds.map((postId)=> <Link key={postId} to={  `/post/${postId}`}>{postId}</Link>)}

                    </div>

                </li>

                <li className="flex">

                    <button type="button" className="flex hover:text-slate-100" onClick={handleExit}> Выйти из аккаунтa</button>
                </li>
            </ul>
        </div>
    )
}


export default ProfileSettings