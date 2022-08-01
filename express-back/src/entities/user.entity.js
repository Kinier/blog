import {EntitySchema} from "typeorm"
import {v4 as uuid} from "uuid"



export const User = new EntitySchema({
    name: "users",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },//
        password: {
            type: String,
        },
        name: {
            type: String,
            nullable: true
        },
        surname: {
            type: String,
            nullable: true
        },
        profilePictureId: {
            type: String,
            nullable: true,
            default: null
        },
        postsIds: {
            type: String,
            array: true,
            unique: true,
            nullable: true
        }
    },
})

