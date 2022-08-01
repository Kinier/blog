import {PostgresDataSource} from "../../app-data-source.js"
import {Post} from "../entities/post.entity.js"
const postRepository = PostgresDataSource.getRepository(Post)
//const post = new Post()


const getAllPosts = async () =>{
    return await postRepository.find()
}

const getPostById = async ({id: id}) =>{
    return await postRepository.findOneBy({id: id}) //
}



const getPostsByOffset = async ({offset: offset}) => {
    return await postRepository.find({
        take: 10,
        skip: offset
    })
}


/*
{
    "creatorId": "gddfgdf",
    "text": "TEXT",
    "date": "2016-01-22 00:00:00",
    "title": "TITILE"
}
 */
const createPost = async ({creatorId: creatorId, text: text, title: title, fileNames: fileNames}) => {
    return await postRepository.save({
        creatorId : creatorId, text: text, date: '2016-01-22 00:00:00', title: title, imagesIds: fileNames
    })
}

/*
  returns this if deleted one row
  {
    "raw": [],
    "affected": 1
}
 */
const deletePostById = async ({id, creatorId}) =>{
    return await postRepository.delete({id: id, creatorId: creatorId})
}


export {
    getAllPosts,
    getPostById,
    getPostsByOffset,
    createPost,
    deletePostById
}