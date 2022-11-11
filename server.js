import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { resolvers } from './resolvers.js'
import { schema } from './schema.js'

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
