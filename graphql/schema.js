const { gql } = require('apollo-server');

const typeDefs = gql`
     type User {
          _id: ID
          name: String! 
          surname: String!
          email: String!
          password: String!
          notices: [Notice]
     }

     type Token {
          token: String!
     }

     type Notice {
          _id: ID
          name: String!
          body: String! 
          userId: User
          categoryId: Category
     }

     type Category {
          _id: ID
          name: String!
          description: String! 
     }

     input RegisterInput {
          name: String!
          surname: String!
          email: String! 
          password: String! 
     }

     input CategoryInput {
          name: String! 
          description: String!
     }

     input NoticeInput {
          name: String! 
          body: String! 
          userId: ID
          categoryId: ID
     }

     type Query {
          getUsers: [User]
          getNotices: [Notice]
          getCategories: [Category]
     }

     type Mutation {
          addUser(data: RegisterInput): Token
          addCategory(data: CategoryInput): Category
          addNotice(data: NoticeInput): Notice
     }
`;



module.exports = typeDefs;