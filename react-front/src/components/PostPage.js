import React, {useEffect, useState} from "react";
import postsApi from "./postsApi";
import userApi from "./userApi";
import {useNavigate, useParams} from "react-router-dom"

function PostPage() {
    const [postData, setPostData] = useState(null)
    const [creatorInfo, setCreatorInfo] = useState(null)
    const [creatorProfilePicture, setCreatorProfilePicture] = useState(null)
    const [modal, setModal] = useState(false)
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const _ = async () => {
            const answer = await postsApi.getPostById({postId: postId})
            if (answer?.error) {
                setPostData(answer?.error)
            } else {
                setPostData(answer)
                console.log(answer)
            }
        }
        _()

    }, [])

    useEffect(() => {

        const _ = async () => {
            if (postData) {
                const somePostCreatorInfo = await userApi.getSomeUserInfo({id: postData?.creatorId})
                if (somePostCreatorInfo?.error) {

                } else {
                    setCreatorInfo(somePostCreatorInfo)
                }
            }

        }

        _()

    }, [postData])

    const getUserProfilePictureId = async ({id: id}) => {
        const answer = await userApi.getSomeUserInfo({id: id})
        return answer
    }


    const showModal = async (e) => {
        document.querySelector("#loader").classList.replace("bg-transparent","bg-white" )
        await document.querySelector("#modal").classList.remove("hidden")


        const creator = await getUserProfilePictureId({id: postData.creatorId})

        const image = await userApi.getProfileAvatarByImageId(creator.profilePictureId)
        document.querySelector("#loader").classList.replace("bg-white","bg-transparent" )

        setCreatorProfilePicture(image ? URL?.createObjectURL(image) : null)

        setTimeout(() => {
            document.querySelector("#modal").classList.add("hidden")

        }, 5000)
    }

    const handleCreatorIdClick = (e) => {
        navigate("/users/" + postData.creatorId)
    }


    return (
        <div className="flex flex-col m-20 items-center w-6/6">
            <div className="flex flex-row w-full items-center justify-center mb-20">
                <div className="flex">Автор поста &nbsp; </div>
                <div className="flex cursor-pointer " onMouseOver={showModal}
                     onClick={handleCreatorIdClick}>{creatorInfo?.username || "Автор"}</div>
                <div id={"modal"}
                     className={"hidden flex flex-row w-64 h-64 bg-slate-700 absolute justify-center items-center m-10 rounded-2xl h-32 bg-opacity-80 cursor-pointer"} onClick={handleCreatorIdClick}>
                    <div className={"flex w-full flex-col"}>
                        <div className={"flex"} >
                            {creatorInfo?.name}
                        </div>
                        <div className={"flex"} >
                            {creatorInfo?.surname}
                        </div>

                    </div>
                    <div id={"loader"} className={"animate-spin flex w-2 h-2 bg-transparent"}>

                    </div>
                    <div className={"flex w-4/6 bg-cover bg-center bg-no-repeat h-full rounded-2xl"}
                         style={{backgroundImage: "url('" + creatorProfilePicture + "')"}}>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full items-center justify-center mb-20">
                <h1 className="flex text-3xl">{postData?.title}</h1>
            </div>

            <div className="flex flex-row w-4/6 items-center justify-center mb-20">
                <div className="flex">{postData?.text}</div>
            </div>

        </div>
    )
}


export default PostPage