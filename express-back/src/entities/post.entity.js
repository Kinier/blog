import {EntitySchema} from "typeorm"
import {v4 as uuid} from "uuid"


export const Post = new EntitySchema({
    name: "posts",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: "uuid",
        },
        creatorId: {
            type: String,
        },
        text: {
            type: String,
        },//
        date: {
            type: Date,
        },
        title: {
            type: String,
            generated: "Date"
        },
        imagesIds: {
            type: String,
            array: true,
            nullable: true,
            default: null
        }
    },
})

