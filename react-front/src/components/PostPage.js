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
        if (postData){
            await document.querySelector("#modal").classList.remove("hidden")


            const creator = await getUserProfilePictureId({id: postData.creatorId})

            const image = await userApi.getProfileAvatarByImageId(creator.profilePictureId)

            setCreatorProfilePicture(image ? URL?.createObjectURL(image) : null)


            setTimeout(() => {
                document.querySelector("#modal").classList.add("hidden")

            }, 5000)
        }

    }

    const handleCreatorIdClick = (e) => {
        navigate("/users/" + postData.creatorId)
    }

    const AnimationLoad = () => <div id={"loader"} className={"animate-spin flex w-2 h-2 bg-white"}></div>

    return (
        <div className="flex flex-col m-20 items-center w-6/6">
            <div className="flex flex-row w-full items-center justify-center mb-20">
                <div className="flex">Автор поста &nbsp; </div>
                <div className="flex cursor-pointer " onMouseOver={showModal}
                     onClick={handleCreatorIdClick}>{creatorInfo?.username || "Автор"}</div>
                <div id={"modal"}
                     className={"hidden flex flex-row w-64 h-64 bg-slate-700 absolute justify-center items-center m-10 rounded-2xl h-32 bg-opacity-80 cursor-pointer"} onClick={handleCreatorIdClick}>
                    <div className={"flex w-full flex-col max-w-2/6 overflow-y-auto"}>
                        <div className={"flex w-full"} >
                            {creatorInfo?.name}
                        </div>
                        <div className={"flex w-full"} >
                            {creatorInfo?.surname}
                        </div>

                    </div>


                    {creatorProfilePicture ?
                        <div className={"flex w-3/6 bg-cover bg-center bg-no-repeat h-full rounded-2xl"}
                             style={{backgroundImage: "url('" + creatorProfilePicture + "')"}}>
                        </div>
                        :
                        <AnimationLoad/>
                    }
                </div>
            </div>

            <div className="flex flex-row w-full items-center justify-center mb-20">
                <h1 className="flex text-3xl">{postData?.title}</h1>
            </div>

            <div className="flex flex-row w-3/6 items-center justify-center mb-20">
                <div className="flex text-xl">{postData?.text}</div>
            </div>

        </div>
    )
}


export default PostPage