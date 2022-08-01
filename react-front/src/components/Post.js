import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import postsApi from "./postsApi";
import test from "../test.jpg";

function Post({ post: post }) {
    const navigate = useNavigate()
    const [image, setImage] = useState("")
    const handleToPost = (e) => {
        const postId = e.currentTarget.id;
        console.log(postId)
        navigate('/post/' + postId)
    }

    useEffect(() => {
        async function fetchData() {

            const imageBlob = await postsApi.getImageById(post.imagesIds[0])
            const imageReady = URL.createObjectURL(imageBlob)
            console.log(post.id, imageReady)
            setImage( imageReady ) 
        }

        fetchData()
        
    }, [])


    return (
        <div className="post bg-white " id={post.id} onClick={handleToPost} style={{backgroundImage: "url('" + image + "')"}}>
            <div className="post__header">

                <p><span>{post.title}</span></p>
            </div>


            <div className="post__text">
                <p><span>{post.text}</span></p>
            </div>
        </div>
    )
}

export default Post