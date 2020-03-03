const { gql } = require('apollo-server');

const typeDefs = gql`

     enum Role {
          SuperAdmin
          Admin
          User
     }

     type User {
          _id: ID
          name: String! 
          email: String!
          username: String!
          password: String!
          role: Role
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
          email: String! 
          username: String!
          password: String! 
     }

     input LoginInput {
          email: String!
          password: String!
     }

     input UpdateUserInput {
          name: String!
          username: String!
          password: String
     }

     input UpdateAdminInput {
          role: Role
     }

     input CategoryInput {
          name: String! 
          description: String
     }

     input NoticeInput {
          name: String! 
          body: String 
          userId: ID!
          categoryId: ID!
     }

     type Query {
          getUsers: [User]
          getUser(email: String!): User
          getNotices: [Notice]
          getCategories: [Category]
     }

     type Mutation {
          addUser(data: RegisterInput): Token
          loginUser(data: LoginInput): Token
          updateUser(data: UpdateUserInput!, email: String!): User
          addCategory(data: CategoryInput): Category
          updateCategory(data: CategoryInput!, categoryId: ID!): Category
          deleteCategory(categoryId: ID!): Category
          addNotice(data: NoticeInput): Notice
          updateNotice(data: NoticeInput!, noticeId: ID!): Notice
          deleteNotice(noticeId: ID!): Notice
          
     }
`;



module.exports = typeDefs;