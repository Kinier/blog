import * as postsRepository from "../models/posts.repository.js";
import * as usersRepository from "../models/users.repository.js";


const getAllPosts = async () => {
    return await postsRepository.getAllPosts()
}

const getPostById = async ({id: id}) => {
    return await postsRepository.getPostById({id: id})
}

const getPostsByOffset = async ({offset: offset}) => {
    return await postsRepository.getPostsByOffset({offset: offset})
}

const createPost = async ({creatorId: creatorId, text: text, title: title, fileNames: fileNames}) => {
    const newPost = await postsRepository.createPost({creatorId: creatorId, text: text, title: title, fileNames: fileNames})
    let user = await usersRepository.getUserById({id: creatorId})
    user.postsIds ? user.postsIds.push(newPost.id) : user.postsIds = [newPost.id]
    await usersRepository.patchUserFields({id: user.id, fields : {postsIds: user.postsIds}})
    return newPost
}


const deletePost = async ({id, creatorId}) => {
    return await postsRepository.deletePostById({id, creatorId})
}

export {
    getAllPosts,
    getPostById,
    getPostsByOffset,
    createPost,
    deletePost
}
