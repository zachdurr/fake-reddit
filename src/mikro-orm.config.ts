import { Options } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post"
import path from "path"


const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post],
    dbName: 'lireddit',
    type: 'postgresql',
    user: 'zacharydurr',
    debug: !__prod__
}

export default config
