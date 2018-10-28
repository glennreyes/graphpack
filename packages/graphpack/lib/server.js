import { ApolloServer } from 'apollo-server';
import { context, resolvers, typeDefs } from './srcFiles';
import { loadServerConfig } from '../config';

if (!(resolvers && Object.keys(resolvers).length > 0)) {
  throw Error(
    `Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`,
  );
}

const createOptions = serverConfig => {
  if (serverConfig) {
    const {
      context: _context,
      resolvers: _resolvers,
      typeDefs: _typeDefs,
      applyMiddleware,
      ...options
    } = serverConfig;

    return options;
  }

  return {};
};

const startServer = async () => {
  // Load server config from graphpack.config.js
  const serverConfig = await loadServerConfig();
  const options = createOptions(serverConfig);

  const server = new ApolloServer({
    ...options,
    context,
    typeDefs,
    resolvers,
  });

  // Apply user provided middlewares
  if (
    serverConfig &&
    serverConfig.applyMiddleware &&
    serverConfig.applyMiddleware.app
  ) {
    server.applyMiddleware(applyMiddleware);
  }

  server
    .listen({
      port:
        Number(process.env.PORT) || (serverConfig && serverConfig.port)
          ? serverConfig.port
          : 4000,
    })
    .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
};

startServer();
