import { ApolloServer } from 'apollo-server';
import { ApolloServer as ApolloExpressServer } from 'apollo-server-express';
import { context, resolvers, typeDefs } from './srcFiles';
import { loadServerConfig } from '../config';

if (!(resolvers && Object.keys(resolvers).length > 0)) {
  throw Error(
    `Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`,
  );
}

const createServer = config => {
  const { applyMiddleware, port: serverPort, ...options } = config;
  const port = Number(process.env.PORT) || serverPort || 4000;
  // Pull out fields that are not relevant for the apollo server

  // Use apollo-server-express when middleware detected
  if (
    applyMiddleware &&
    applyMiddleware.app &&
    typeof applyMiddleware.app.listen === 'function'
  ) {
    const server = new ApolloExpressServer(options);
    server.applyMiddleware(applyMiddleware);

    return applyMiddleware.app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
      ),
    );
  }

  // Use apollo-server
  const server = new ApolloServer(options);

  return server
    .listen({ port })
    .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
};

const startServer = async () => {
  // Load server config from graphpack.config.js
  const config = await loadServerConfig();

  createServer({ ...config, context, resolvers, typeDefs });
};

startServer();
