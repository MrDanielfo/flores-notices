const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Apollo Server
const { ApolloServer } = require('apollo-server');
// Resolvers and TypeDefs
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

// Database connection
mongoose.connect(process.env.MONGO_URI, {
     useUnifiedTopology: true,
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false
})
.then(() => console.log('Connected to Database'))
.catch((err) => console.log(err))

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
     typeDefs,
     resolvers
});

server.listen(PORT).then(({url}) => console.log(`🚀  Server ready at ${url}`));


