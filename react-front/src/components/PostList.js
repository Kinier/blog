import React, { useState, useRef, useEffect } from "react";
import Post from "./Post"
import userApi from "./userApi";
import postsApi from "./postsApi";



function PostList() {
    const [postsMinimal, setPostsMinimal] = useState([])
    const postsLoadedCount = useRef(0)
    const isItOkayToUpdate = useRef(true)

    useEffect(() => {
        async function _(){
            document.getElementById("posts-list__end").style.backgroundColor = 'white'
            const newPosts = await postsApi.getSomePosts(postsLoadedCount.current)
            if (newPosts.length != 0) {
                setPostsMinimal([...postsMinimal, ...newPosts])
                postsLoadedCount.current += newPosts.length
            }
            document.getElementById("posts-list__end").style.backgroundColor = 'transparent'
        }

        _()

    }, [])

    
    const preventSpammingUpdate = () => {
        isItOkayToUpdate.current = false
        setTimeout(() => {
            isItOkayToUpdate.current = true
        }, 5000);
    }

    const handleScroll = async (e) => {
        if (isItOkayToUpdate.current == true) {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 200) {
                console.log("Должно быть")
                document.getElementById("posts-list__end").style.backgroundColor = 'white'
                const newPosts = await postsApi.getSomePosts(postsLoadedCount.current)
                if (newPosts.length != 0) {
                    console.log("СЮДА БЛЯ ДОШЛО")
                    setPostsMinimal([...postsMinimal, ...newPosts])
                    postsLoadedCount.current += newPosts.length
                }
                document.getElementById("posts-list__end").style.backgroundColor = 'transparent'
                 preventSpammingUpdate()
                 
            }
            
        }
    }

    return (
        <div className="posts-list border-none" onWheel={handleScroll} >
            {postsMinimal.map((post) => {
                return <Post key={post.id} post={post} />
            })}
            <div id="posts-list__end"></div>
        </div>
    )
}


export default PostList