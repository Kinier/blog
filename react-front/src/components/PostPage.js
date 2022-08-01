import React, { useEffect, useState } from "react";
import postsApi from "./postsApi";
import userApi from "./userApi";
import { useNavigate, useParams } from "react-router-dom"
function PostPage() {
    const [postData, setPostData] = useState(null)
    const [creatorInfo, setCreatorInfo] = useState(null)
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const _ = async () =>{
            const answer = await postsApi.getPostById({ postId: postId })
            if (answer?.error) {
                setPostData(answer?.error)
            } else {
                setPostData(answer)
                console.log(answer)
            }
        }
        _()

        return async () => {
            



        }
    }, [])

    useEffect(() => {

        const _ = async () => {
            console.log(postData)
            if (postData) {
                const somePostCreatorInfo = await userApi.getSomeUserInfo({ id: postData?.creatorId })
                if (somePostCreatorInfo?.error) {

                } else {
                    setCreatorInfo(somePostCreatorInfo);
                }
            }
        }

        _()
        
    }, [postData])


    const handleCreatorIdClick = (e) => {
        navigate("/users/" + e.target.textContent)
    }


    return (
        <div className="flex flex-col m-20 items-center w-6/6">
            <div className="flex flex-row w-full items-center justify-center mb-20">
                <div className="flex">Автор поста &nbsp; </div>
                <div className="flex cursor-pointer " onClick={handleCreatorIdClick}>{creatorInfo?.username || "Автор"}</div>
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