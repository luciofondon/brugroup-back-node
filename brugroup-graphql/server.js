'use strict'

const Eureka = require('eureka-js-client').Eureka
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')
const chalk = require('chalk')
const { join } = require('path')
const { readFileSync } = require('fs')

const eurekaData = require('./config/eureka/eureka-client.json')
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'

const app = express()
const client = new Eureka(eurekaData)

client.start(() => {
  const eureka = client.getInstancesByAppId('BRUGROUP-REST')
  process.env.endpoint = `http://${eureka[0].ipAddr}:${eureka[0].port.$}`
  console.log(`${chalk.green('[brugroup-api]')} server rest ${process.env.endpoint}`)
  const typeDefs = readFileSync(
    join(__dirname, 'src', 'schemas', 'schema.graphql'),
    'utf-8'
  )

  const resolvers = require('./src/resolvers')
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  app.use(cors())
  app.use('/api', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: isDev
  }))

  app.listen(port, () => {
    console.log(`${chalk.green('[brugroup-api]')} server listening on port ${port}`)
  })
})
