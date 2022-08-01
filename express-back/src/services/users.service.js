import * as usersRepository from "../models/users.repository.js";
import jwt from "jsonwebtoken"


const getAllUsers = async () => {
    return await usersRepository.getAllUsers()
}

const getUserById = async ({id: id}) => {
    return await usersRepository.getUserById({id: id})
}

const patchUserFields = async ({id :id, fields: fields}) =>{
    const isUpdated = await usersRepository.patchUserFields({id :id, fields: fields})
    if (isUpdated.affected > 0){
        return usersRepository.getUserById({id: id})
    }else{
        return null
    }
}

const addProfilePicture = async ({filename:filename, profileId: profileId}) =>{
    return await usersRepository.addProfilePicture({filename:filename, profileId: profileId})
}


const getUserByEmailAndPassword = async ({email: email, password: password}) => {
    const user = await usersRepository.getUserByEmailAndPassword({email: email, password: password})
    if (user){
        return user
    }else{
        return false
    }
}

const createUser = async ({username: username, email: email, password: password, name: name, surname: surname}) => {
    const user = await usersRepository.getUserByEmail({email: email})
    if (user){
        return false
    }else{
        return await usersRepository.createUser({username: username, email: email, password: password, name: name, surname: surname})
    }
}



const deleteUser = async ({id, }) =>{
    return await usersRepository.deleteUserById({id, })
}

export {
    getAllUsers,
    getUserByEmailAndPassword,
    addProfilePicture,
    patchUserFields,
    getUserById,
    createUser,
    deleteUser
}
