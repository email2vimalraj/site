---
title: Deploying GraphQL Server on Heroku
date: 2018-02-07
---

Today, I'll show you on how to deploy a simple Graphql server on Heroku. I'm considering the following stack to show my example:

- Mongo (using <strong>mongoose</strong>)
- Express
- GraphQL (using <strong>apollo-server</strong>)
- NodeJS server

A sample GraphQL server look like this:

```javascript
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import { connectToDB } from './database'

// Start the http server
const startServer = async () => {
  const { User } = require('./database/models')

  // GraphQL Types
  const typeDefs = `
    type User {
      _id: ID!
      name: String
      password: String
    }

    type Query {
      users: [User]
    }

    type Mutation {
      addUser(input: UserInput): User
    }

    input UserInput {
      name: String!
      password: String!
    }
  `

  // GraphQL resolvers
  const resolvers = {
    Query: {
      users: async () => {
        const res = await User.find()
        return res
      }
    },

    Mutation: {
      addUser: async (root, args) => {
        const res = await User.create(args.input)
        return res
      }
    }
  }

  // Define a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  // Initiate express and define routes
  const app = express()
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  app.use('/', graphiqlExpress({ endpointURL: '/graphql' }))

  // Initiate the server
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port: ${process.env.PORT || 3000}`)
  })
}

// Connecting to DB and then start the server
const dbConnectAndStartServer = async () => {
  try {
    await connectToDB()
    console.log('Connected to Mongo successfully')
    startServer()
  } catch (err) {
    console.error(`Error connecting to mongo - ${err.message}`)
    process.exit(1)
  }
}

// Entry point
dbConnectAndStartServer()
```

I have one Mutation which is used to add an user to the mongo collection and one Query which is used to query all the users from the mongo collection.

My `database.js` looks like this:

```javascript
const { Mongoose } = require('mongoose')

let connection = null

const connectToDB = async () => {
  const mongoose = new Mongoose()
  mongoose.Promise = global.Promise

  let mongoUserCredentials = ''
  if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
    mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
  }

  const MONGO_URL = process.env.MONGO_URL || 'localhost:27017'
  const DB_NAME = process.env.MONGO_DB_NAME || 'sample-db'
  const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`

  await mongoose.connect(MONGO_CONNECTION_STRING)
  connection = mongoose
}

const getDB = () => {
  if (!connection) {
    throw new Error('Call connectToDB first')
  }
  return connection
}

module.exports = {
  connectToDB,
  getDB
}
```

I'm taking few inputs through the environment variables because I'll be using `mLab mongodb` for the heroku deployment.

You can download the entire source code from [here](https://github.com/email2vimalraj/graphql-heroku).

Let's start deploying our GraphQL server on Heroku now.

# Pre-requisites

- You should have the Heroku account.
- You should have the Heroku cli installed. Download from [here](https://devcenter.heroku.com/articles/heroku-cli).

# Setup

Go to [heroku dashboard](https://dashboard.heroku.com/apps) by logging in.

You will see something like this:

![Heroku dashboard](./Screen-Shot-2018-02-06-at-11.23.52-PM-1024x85.png)

Click on `New` from the right side and click on `Create New App`.

Enter the app name. In my case, I've entered as graphql-heroku. You may not get the same name since I've already taken. :D

Click on Create app button.

Once your app is created, goto `Resources` tab and search for `mLab MongoDB`.
In the popup, select `Sandbox - Free` and click on Provision. Once provisioned successfully, you can see something like this:

![Successful provision](http://www.vimalselvam.com/wp-content/uploads/2018/02/Screen-Shot-2018-02-06-at-11.36.29-PM.png)

Click on `mLab MongoDB :: Mongodb` which will open up a mLab console on a new tab.

Click on <strong>Users</strong> tab and click on `Add Database User` button to create a new database user. Set a user name and password to access the mongodb database. Kindly note the following items:

- Username
- Password
- DB Hostname
- DB port number
- DB name

Now go back to your heroku dashboard.

Open up your terminal in your local machine and type as follows:

```bash
heroku login
```

Follow the prompts to create your SSH public key and login to heroku.

Then set the following environment configs:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false -a <<<app name>>>
heroku config:set MONGO_USER=<<<db user name>>> -a <<<app name>>>
heroku config:set MONGO_PASSWORD=<<<db password>>> -a <<<app name>>>
heroku config:set MONGO_URL=<<<mongo host name>>>:<<<mongo port number>>> -a <<<app name>>>
heroku config:set MONGO_DB_NAME=<<<mongo db name>>> -a <<<app name>>>
```

Ufff!!! Too many configs right! That's fine, it is an one-time setup.

Finally, run if you have an existing git repository:

```bash
heroku git:remote -a <<<app name>>>
```

If not:

```bash
cd <<<project directory>>>
git init
heroku git:remote -a <<<app name>>>
git add .
git commit -m "Ready to serve GraphQL"
```

Now we are going to deploy our GraphQL server. Sit tight!

```bash
git push heroku master
```

You should see the build happening in your terminal and at the end you see something like this:

```bash
remote: -----> Launching...
...
remote:        https://graphql-heroku.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/graphql-heroku.git
 * [new branch]      master -> master
```

Great! Our graphql server is successfully deployed on Heroku. So if you hit [https://graphql-heroku.herokuapp.com/](https://graphql-heroku.herokuapp.com/) in your browser, you can see the `GraphiQL` launching.

To create a new user, execute the following in GraphiQL:

```graphql
mutation addUser {
  addUser(input: { name: "Vimal", password: "secret" }) {
    name
    password
  }
}
```

and to query the list of users, you can execute the following:

```graphql
query Users {
  users {
    name
    password
  }
}
```

Hurray! We have successfully deployed in Heroku and the GraphQL server along with GraphiQL interface can be shared across any one in the world.

If you like this post, kindly hit the STAR button and share it.
