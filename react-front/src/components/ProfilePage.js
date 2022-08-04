import React, { useEffect, useState } from "react";

import Header from "./Header";
import ProfileSettings from "./ProfileSettings";
import { useNavigate } from "react-router-dom"
import userApi from "./userApi"
function ProfilePage({ cookie: cookie, setCookie: setCookie, removeCookie: removeCookie }) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const [isProfileSettingsLoaded, setIsProfileSettingsLoaded] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!cookie?.jwt) {
            navigate("/register")
        }


        async function _() {
            const answer = await userApi.getUserInfo({ cookie: cookie })
            console.log(answer)
            if (answer?.error) {

                setErrorMessage(answer?.error)
                if (answer.error == "jwt expired") // TODO если перейти на страницу профиля с другой страницы, то редирект не сработает
                    removeCookie("jwt")
            } else {
                setProfileData(answer)
                setIsProfileSettingsLoaded(true)
            }
        }

        _()

    }, [])


    useEffect(()=> {
        if (!cookie?.jwt) {
            navigate("/register")
        }
    }, [cookie])




    return (
        <div className="flex flex-col font-mono"  >


            <div className="main-content">
                {errorMessage}

                <ProfileSettings cookie={cookie} setCookie={setCookie} removeCookie={removeCookie} profileData={profileData} setProfileData={setProfileData} isProfileSettingsLoaded={isProfileSettingsLoaded}/>
            </div>




        </div>
    )
}

export default ProfilePage