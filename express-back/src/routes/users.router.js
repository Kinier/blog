import Router from "express"
import {StatusCodes} from "http-status-codes"
import * as usersService from "../services/users.service.js";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid"

import {authMiddleware} from "../middleware/auth.middleware.js";

import multer from 'multer'
import * as postsService from "../services/posts.service.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profiles/');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.jpg`);
    }
})
const upload = multer({storage}).single('avatar');

const router = Router()

router.route("/").get( async (req, res, next) => {
    const users = await usersService.getAllUsers();

    return res.status(StatusCodes.OK).json(users.map((user) => user))
})


/**
 * get user information, user id comes with authentication token - jwt
 */
router.route("/profile").get( authMiddleware, async (req, res, next) => {

    console.log(req.user.id)
    const user = await usersService.getUserById({id: req.user.id});
    const {id: id, username:username, email:email, name:name, surname:surname, postsIds: postsIds, profilePictureId: profilePictureId} = user
    return res.status(StatusCodes.OK).json(
        {id: id, username:username, email:email, name:name, surname:surname, postsIds: postsIds, profilePictureId: profilePictureId}
    )
})


router.route("/someinfo/:id").get( async (req, res, next) => {


    console.log(req.params.id)//
    const user = await usersService.getUserById({id: req.params.id});
    const {id: id, username:username, name:name, surname:surname,} = user
    return res.status(StatusCodes.OK).json(
        {id: id, username:username, name:name, surname:surname}
    )
})


/*
{
    "username",
    "email",
    "password",
    "name",
    "surname",
    "postsIds",

}
 */
router.route("/register").post(async (req, res, next) => { //fixme change routes to like rest api or what..
    const {username, email, password, name, surname} = req.body

    const newUser = await usersService.createUser(
        {username: username, email: email, password: password, name: name, surname: surname}
    );
    if (newUser) {
        return res.status(StatusCodes.OK).json(
            jwt.sign(
                {id: newUser.id}, process.env.SECRET_KEY,
                {"expiresIn": "24h"})
            )
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({"error": "User with such username or email exists i assume"})
    }
})

router.route("/login").post(async (req, res, next) => {
    const {email, password} = req.body

    const newUser = await usersService.getUserByEmailAndPassword(
        {email: email, password: password}
    );

    if (newUser) {
        return res.status(StatusCodes.OK).json(
            jwt.sign(
                {id: newUser.id}, process.env.SECRET_KEY,
                {"expiresIn": "24h"})
        )
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({"error": "User with such email dont exist or password is wrong"})
    }
})


router.route("/:id").patch(authMiddleware,async (req,res) =>{
    if (req.params.id !== req.user.id){
        return res.status(StatusCodes.BAD_REQUEST).json({"error": "there is somthing strange about your token"})
    }
////
    const updatedUser = await usersService.patchUserFields({id :req.params.id, fields: req.body})
    if (updatedUser){
        return res.status(StatusCodes.OK).json({updatedUser})
    }else{
        return res.status(StatusCodes.NOT_FOUND).json({"error": "user not found"})
    }
})

// router.route("/:id").delete(async (req, res) => {
//     const id = req.params.id
//     const deletedUser = await usersService.deleteUser({id})
//
//     return res.status(StatusCodes.OK).json(deletedUser)
// })

router.route("/profile/:id/image").patch(authMiddleware, upload, async (req, res, next) => {

    const filename = req.file.filename
    const profileId = req.params.id;
    console.log(filename, profileId)
//
    const user = await usersService.addProfilePicture({filename:filename, profileId: profileId});
    if (user.affected < 1){
        return res.status(StatusCodes.NOT_FOUND).json({error: "user not found or you dont have rights to do this operation"})
    }

    return res.status(StatusCodes.OK).json(user)
})

router.route("/profile/image/:id").get(async (req,res, next) => {


    const image = req.params.id
    return res.status(StatusCodes.OK).sendFile(image, {root: './public/profiles'})
})

export default router
