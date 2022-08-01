import * as postsRepository from "../models/posts.repository.js";


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
    return await postsRepository.createPost({creatorId: creatorId, text: text, title: title, fileNames: fileNames})
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
