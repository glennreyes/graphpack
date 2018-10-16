import { ApolloServer } from 'apollo-server';
import { config, context, resolvers, typeDefs } from './srcFiles';

if (!(resolvers && Object.keys(resolvers).length > 0)) {
  throw Error(
    `Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`,
  );
}

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
