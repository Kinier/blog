import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postsApi from '../Api/postsApi'
import userApi from "../Api/userApi";
function NewPostPage({ cookie: cookie, removeCookie: removeCookie }) {




    const navigate = useNavigate()

    const [formInputs, setFormInputs] = useState({ "title": "", "text": "" })
    const [errorMessage, setErrorMessage] = useState(null)
    const [uploadedFilePreview, setUploadedFilePreview] = useState(null)
    const [uploadedFiles, setUploadedFiles] = useState([])

    useEffect(() => {
        if (!cookie?.jwt) {
            navigate("/notLogged")
        }
    }, [cookie])

    const handleFormInputs = async (e) => {
        e.target.style.height = (e.target.scrollHeight) + 'px';

        const inputName = e.target.name
        const inputValue = e.target.value
        console.log({ ...formInputs, [inputName]: inputValue })
        setFormInputs({ ...formInputs, [inputName]: inputValue })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post = await postsApi.createPost({ cookie: cookie, text: formInputs.text, title: formInputs.title, files: uploadedFiles })
        if (post?.error) {
            setErrorMessage(post?.error)
            if (post.error === "jwt expired")
                    removeCookie("jwt")
        } else {
            navigate('/post/' + post.id)
        }

        console.log(post)
    }

    const handleFileUpdate = (e) => {
        if (e?.target?.files[0]) {
            setUploadedFilePreview(URL.createObjectURL(e.target.files[0]))
            setUploadedFiles(files => [...files, e.target.files[0]])
        }
    }


    return (
        <div className="flex flex-col items-center mt-20 " >

            <form onSubmit={handleSubmit} className="flex flex-col main-background-color  w-5/6 items-center rounded-2xl" id="new-post-form ">

                <div className="flex text-5xl my-5">
                    Создание поста
                </div>
                <div className="flex flex-col items-center border-4 border-neutral-400 rounded-xl w-3/6 overflow-auto my-5">
                    <h2 className="text-2xl text-white">Главная картинка для поста</h2>
                    <input className="flex" type={"file"} onChange={handleFileUpdate}></input>
                </div>


                <h2 className="text-2xl text-neutral-900">Вот так будет выглядеть пост на главной странице</h2>
                <div className="post" style={{ backgroundImage: "url('" + uploadedFilePreview + "')" }}>
                    <div className="post__header">

                        <p><span>{formInputs.title}</span></p>
                    </div>


                    <div className="post__text">
                        <p><span>{formInputs.text}</span></p>
                    </div>
                </div>

                <textarea placeholder="Заголовок статьи" name="title" value={formInputs.title || ""} onChange={handleFormInputs} className="text-4xl w-4/6  mt-12 opacity bg-transparent border-t-teal-600 border-2 rounded-md" required form="new-post-form">

                </textarea>




                <textarea rows={"10"} cols={"10"} wrap={"hard"} placeholder="Содержание статьи" name="text" value={formInputs.text || ""} onChange={handleFormInputs} className=" bg-transparent text-xl w-4/6  mt-12 border-t-teal-600 border-2 rounded-md" required form="new-post-form">

                </textarea>

                {errorMessage}

                <input type={"submit"} className="flex h-24 bg-slate-700 rounded-3xl m-5 p-5"></input>
            </form>


        </div>
    )
}


export default NewPostPage