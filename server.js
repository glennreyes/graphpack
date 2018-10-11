import { ApolloServer } from 'apollo-server';
import resolvers from '__GRAPHPACK_SRC__/resolvers';
import typeDefs from '__GRAPHPACK_SRC__/schema';
// import fs from 'fs';

// console.log(require.resolve('__GRAPHPACK_SRC__/context'));

// console.log(fs.existsSync('./src/context'));

// import('__GRAPHPACK_SRC__/context');

// if (fs.existsSync('./src/context')) {
//   const context = require(fs.existsSync('./src/context')
//     ? '__GRAPHPACK_SRC__/context'
//     : './src/context');
// }

// const context = fs.existsSync('./src/context')
//   ? require('__GRAPHPACK_SRC__/context')
//   : undefined;

const server = new ApolloServer({
  // context,
  typeDefs,
  resolvers,
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
