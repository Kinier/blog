

import Router from "express"
import {v4 as uuid} from "uuid"


import {StatusCodes} from "http-status-codes"
import * as postsService from "../services/posts.service.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.jpg`);
    }
})
const upload = multer({storage}).array('files', 5);
// todo сменить метод array на fieldname( или чето такое ), чтобы красиво и удобно можно обрабатывать

const router = Router()

router.route("/").get(async (req, res, next) => {
    const posts = await postsService.getAllPosts();

    return res.status(StatusCodes.OK).json(posts.map((post) => post))
})
router.route("/:id").get(async (req, res, next) => {
    const id = req.params.id

    const post = await postsService.getPostById({id: id});

    if (post) {
        return res.status(StatusCodes.OK).json(post)
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({error: "Не найдено такого поста"})
    }

})

/**
 * method returns 10 posts from offset, may be less if there is no more posts
 */
router.route("/offset/:offset").get(async (req, res, next) => {
    const offset = req.params.offset
    console.log(offset)//
    const posts = await postsService.getPostsByOffset({offset: offset});
    return res.status(StatusCodes.OK).json(posts.map((post) => post))
})

router.route("/image/:id").get(async (req,res, next) => {


    const image = req.params.id
        return res.status(StatusCodes.OK).sendFile(image, {root: './public'})
})

router.route("/").post(authMiddleware, upload, async (req, res, next) => {

    const fileNames = req.files.map((file)=>{
        return file.filename
    })

    const {text, title} = req.body
    const creatorId = req.user.id

    const post = await postsService.createPost({creatorId: creatorId, text: text, title: title, fileNames: fileNames});


    return res.status(StatusCodes.OK).json(post)
})

// todo здесь creatorid должен браться из jwt, но мб разделение по полномочиям сделать хуй знант
router.route("/:id").delete(async (req, res) => {
    const id = req.params.id
    const {creatorId} = req.body
    const deletedPost = await postsService.deletePost({id, creatorId})

    return res.status(StatusCodes.OK).json(deletedPost)
})


export default router
