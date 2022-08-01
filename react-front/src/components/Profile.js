import React, { useEffect, useState } from "react";

import Header from "./Header";
import ProfileSettings from "./ProfileSettings";
import { useNavigate } from "react-router-dom"
import userApi from "./userApi"
function Profile({ cookie: cookie, setCookie: setCookie, removeCookie: removeCookie }) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookie?.jwt) {
            navigate("/register")
        }


        async function _() {
            const answer = await userApi.getUserInfo({ cookie: cookie })

            if (answer?.error) {
                setErrorMessage(answer?.error)
                if (answer.error === "jwt expired")
                    removeCookie("jwt")
            } else {
                setProfileData(answer)
            }
        }

        _()

    }, [cookie])




    return (
        <div className="flex flex-col font-mono"  >


            <div className="main-content">
                {errorMessage}

                <ProfileSettings cookie={cookie} setCookie={setCookie} removeCookie={removeCookie} profileData={profileData} setProfileData={setProfileData} />
            </div>




        </div>
    )
}

export default Profile