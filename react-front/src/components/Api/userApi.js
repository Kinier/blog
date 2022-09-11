import jwtDecode from "jwt-decode"

const URL = "http://localhost:5000/users"

class userApi {

    async getProfileAvatarByImageId(id) {
        let response = null
        try {
            response = await fetch(URL + `/profile/image/${id}`)
        } catch (e) {
            console.log(e.message)
        }

        return response?.blob()

    }

    async addProfileAvatar({avatar: avatar, profileId: profileId, cookie: cookie}) {
        let response = null
        let fd = new FormData()

        fd.append("avatar", avatar)
        try {
            response = await fetch(URL + `/profile/${profileId}/image`, {
                method: "PATCH",
                body: fd,
                headers: {
                    "Authorization": `Bearer ${cookie?.jwt}`
                }
            })
        } catch (error) {
            console.log(error.message + "Ошибка ")
        }

        if (!response?.ok) {
            return null
        } else {
            return (response.json())
        }
    }

    async patchUserInfo({key: key, value: value, userId: userId, cookie: cookie}) {
        let response = null
        try {
            response = await fetch(URL + `/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({[key]: value}),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${cookie?.jwt}`
                }
            })
        } catch (error) {
            console.log(error.message + "Ошибка ")
        }

        return response.json()
    }

    async getUserInfo({cookie: cookie}) {
        let response = null

        try {
            response = await fetch(URL + '/profile', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie?.jwt}`
                },

            })
        } catch (e) {
            console.log(e.message + "Ошибка ")
        }

        if (response?.status == "401") {
            return response.json()
        } else if (!response?.ok) {
            return null
        } else {
            return (response.json())
        }

    }
// for admin
    async getUsers({cookie: cookie}) {
        let response = null

        try {
            response = await fetch(URL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie?.jwt}`
                },

            })
        } catch (e) {
            console.log(e.message + "Ошибка ")
        }

        if (response?.status == "401") {
            return response.json()
        } else if (!response?.ok) {
            return null
        } else {
            return (response.json())
        }

    }

    /**
     *get user username, name, surname, id
     *
     * @param {*} {id : id}
     * @return {*}
     * @memberof userApi
     */
    async getSomeUserInfo({id: id}) {
        let response = null

        try {
            response = await fetch(URL + `/someinfo/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },

            })
        } catch (e) {
            console.log(e.message + "Ошибка ")
        }


        if (!response?.ok) {
            return null
        } else {
            return (response.json())
        }
    }

    async register({username: username, email: email, password: password}) {
        let response = null

        console.log(JSON.stringify({"username": username, "email": email, "password": password}))

        try {
            response = await fetch(URL + '/register', {
                method: "POST",
                body: JSON.stringify({"username": username, "email": email, "password": password}),
                headers: {
                    'Content-Type': 'application/json',
                },

            })
        } catch (e) {
            console.log(e.message)
        }

        // TODO: ну в куки тут записывать хуй знает

        return (response.json())
    }

    async login({email: email, password: password}) {
        let response = null

        try {
            response = await fetch(URL + '/login', {
                method: "POST",
                body: JSON.stringify({"email": email, "password": password}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        } catch (e) {
            console.log(e.message)
        }

        // TODO: ну в куки тут записывать хуй знает

        return (response.json())
    }


}


export default new userApi()