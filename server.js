import { ApolloServer } from 'apollo-server';
import resolvers from '__GRAPHPACK_USER_SRC__/resolvers';
import typeDefs from '__GRAPHPACK_USER_SRC__/schema';

const importAll = req => req.keys().map(mod => req(mod).default);

// Optionally import modules
const config = importAll(
  require.context(
    '__GRAPHPACK_USER_SRC__',
    true,
    /^\.\/(config|config\/index)\.(js|ts)$/,
  ),
)[0];
const context = importAll(
  require.context(
    '__GRAPHPACK_USER_SRC__',
    true,
    /^\.\/(context|context\/index)\.(js|ts)$/,
  ),
)[0];

const server = new ApolloServer({
  ...config,
  context,
  typeDefs,
  resolvers,
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));

export default server;
