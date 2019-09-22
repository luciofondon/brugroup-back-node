const Eureka = require('eureka-js-client').Eureka;
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs')

const asyncify = require('express-asyncify')
const chalk = require('chalk')
const { join } = require('path')
const debug = require('debug')('brugroup:graphql')
const resolvers = require('./src/resolvers')

const port = process.env.PORT || 3000

console.log(`${__dirname}/config/eureka`)

const eurekaData = require('./config/eureka/eureka-client.json')
const client = new Eureka(eurekaData);

const app = express();
const isDev = process.env.NODE_ENV !== 'production'

const typeDefs =  readFileSync(
    join(__dirname, 'src', 'schemas', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors())
app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: isDev
}))

client.start(()=>{
    app.listen(port, () => {
        console.log(`${chalk.green('[brugroup-api]')} server listening on port ${port}`)
        const eureka = client.getInstancesByAppId("BRUGROUP-REST")
       // console.log(eureka)
    })
})




