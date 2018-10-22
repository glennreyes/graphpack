import { ApolloServer } from 'apollo-server';
import { once } from 'ramda';
import { config, context, resolvers, typeDefs } from './srcFiles';

if (!(resolvers && Object.keys(resolvers).length > 0)) {
  throw Error(
    `Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`,
  );
}

let options = {};

if (config) {
  // Renaming to avoid shadowing
  const {
    context: _context,
    resolvers: _resolvers,
    typeDefs: _typeDefs,
    applyMiddleware,
    ...rest
  } = config;
  options = rest;
}

const server = new ApolloServer({
  ...options,
  context,
  typeDefs,
  resolvers,
});

// Apply user provided middlewares
server.applyMiddleware(applyMiddleware);

server
  .listen({ port: ((config.PORT || config.port) || (process.env.PORT || 4000)) })
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`));

export default server;
