import {DataSource} from "typeorm"

import "dotenv/config"

const PostgresDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        "src/entities/*.js"
    ],
    migrations: [
        "src/migration/**/*.js"
    ],
    cli: {
        entitiesDir: "/entities/",
        migrationsDir: "/migration/",
    }
})

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export {PostgresDataSource}
