import { resolvers } from './resolvers.js'
import { schema } from './schema.js'

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config()

const port = process.env.PORT || 4000
const app = express()

app.use(cors())

app.use(
    '/',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    })
)
app.listen(port)

console.log(`Listening on port ${port}`)
