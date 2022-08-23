import React, {useEffect, useState} from "react"
import userApi from "./userApi"
import {useNavigate, useParams} from "react-router-dom";


function UserInfoPage({cookie: cookie}) {
    const [userData, setUserData] = useState(null)
    const {userId} = useParams()
    const [errorMessage, setErrorMessage] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const _ = async () => {
            if (userId) {
                const userInfo = await userApi.getSomeUserInfo({id: userId})
                if (userInfo?.error || !userInfo) {
                    setErrorMessage("Чето не сработало")
                    navigate('/nopage')
                } else {
                    setUserData(userInfo)
                }

                const image = await userApi.getProfileAvatarByImageId(userInfo?.profilePictureId)


                setAvatarPreview(image ? URL?.createObjectURL(image) : null)
            }

        }

        _()

    }, [])
    return (
        <div className="flex flex-col w-full items-center mt-20">
            <div
                className="flex flex-col border-none rounded-lg main-background-color w-4/6 items-center text-xl max-w-full">
                <div
                    className="flex w-1/6 h-20 justify-end items-center mr-4 rounded-xl h-64 bg-cover bg-no-repeat bg-center"
                    style={{backgroundImage: "url('" + avatarPreview + "')"}}>
                    {avatarPreview ? "" : "Место для фотографии профиля"}
                </div>
                <li className="flex flex-row w-full my-2">
                    <div className={"flex w-1/2 justify-end items-center mr-4"}>
                        Ник
                    </div>
                    <div className={"flex w-1/2 justify-start items-center mr-4"}>
                         {userData?.username}
                    </div>
                </li>

                <li className="flex flex-row w-full my-2">
                    <div className={"flex w-1/2 justify-end items-center mr-4"}>
                        Имя
                    </div>
                    <div className={"flex w-1/2 justify-start items-center mr-4"}>
                         {userData?.name}
                    </div>
                </li>
                <li className="flex flex-row w-full my-2">
                    <div className={"flex w-1/2 justify-end items-center mr-4"}>
                        Фамилия
                    </div>
                    <div className={"flex w-1/2 justify-start items-center mr-4"}>
                         {userData?.surname}
                    </div>
                </li>

            </div>
        </div>
    )
}

export default UserInfoPage