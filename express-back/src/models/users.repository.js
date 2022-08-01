import {PostgresDataSource} from "../../app-data-source.js"
import {User} from "../entities/user.entity.js"
const userRepository = PostgresDataSource.getRepository(User)
//const user = new User()


const getAllUsers = async () =>{
    return await userRepository.find()
}

const getUserById = async ({id: id}) =>{
    return await userRepository.findOneBy({id: id})
}

const getUserByEmail = async ({email: email}) => {
    const user = await userRepository.findOneBy({email: email})

    return user
}

const getUserByEmailAndPassword = async ({email: email, password: password}) => {
    const user = await userRepository.findOneBy({email: email, password: password})

    return user
}

const createUser = async ({username: username, email: email, password: password, name: name, surname: surname}) => {
            return await userRepository.save({
                username : username, email: email, password: password, name: name, surname: surname, postsId: []
            })
}

const patchUserFields = async ({id :id, fields: fields})=>{
    return await userRepository.update({id: id}, fields)
}


const addProfilePicture = async ({filename:filename, profileId: profileId})=>{
    return await userRepository.update({id:profileId}, {profilePictureId: filename})
}


/*
  returns this if deleted one row
  {
    "raw": [],
    "affected": 1
}
 */
const deleteUserById = async ({id, }) =>{
    return await userRepository.delete({id: id, })
}


export {
    getAllUsers,
    getUserByEmail,
    addProfilePicture,
    getUserById,
    getUserByEmailAndPassword,
    createUser,
    patchUserFields,
    deleteUserById
}