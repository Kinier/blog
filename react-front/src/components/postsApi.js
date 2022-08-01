const URL = "http://localhost:5000/posts"



class postsApi {
    async getImageById(id){
        let response = null
        try {
            response = await fetch(URL + `/image/${id}`)
        } catch (e) {
            console.log(e.message)
        }

        return (response.blob())
    }

    async getSomePosts(offset) {
        console.log(offset)
        let response = null
        try {
            response = await fetch(URL + `/offset/${offset}`)
        } catch (e) {
            console.log(e.message)
        }

        return (response.json())
    }

    async getPostById({postId: postId}) {
        console.log(postId)
        let response = null
        try {
            response = await fetch(URL + `/${postId}`)
        } catch (e) {
            console.log(e.message)
        }

        return (response.json())
    }


    async createPost({cookie: cookie, text: text, title: title, files: files}) {
        let response = null

        let fd = new FormData()
        
        fd.append("title", title)
        fd.append("text", text)

        files.forEach(file => {
            fd.append("files", file)
        });

        try {
            response = await fetch(URL, {
                method: "POST",
                body: fd,
                headers: {
                    'Authorization': `Bearer ${cookie?.jwt}`
                }
            })
        } catch (e) {
            console.log(e.message)
        }

        return (response.json())
    }
}


export default new postsApi()