export const importFirst = req =>
  req.keys().map(mod => req(mod).default || req(mod))[0];

// Optionally import modules
export const config = importFirst(
  require.context(
    process.env.GRAPHPACK_SRC_DIR,
    true,
    /^\.\/(config|config\/index)\.(js|ts)$/,
  ),
);
export const context = importFirst(
  require.context(
    process.env.GRAPHPACK_SRC_DIR,
    true,
    /^\.\/(context|context\/index)\.(js|ts)$/,
  ),
);
export const resolvers = importFirst(
  require.context(
    process.env.GRAPHPACK_SRC_DIR,
    true,
    /^\.\/(resolvers|resolvers\/index)\.(js|ts)$/,
  ),
);
export const typeDefs = importFirst(
  require.context(
    process.env.GRAPHPACK_SRC_DIR,
    true,
    /^\.\/(schema|schema\/index)\.(graphql|js|ts)$/,
  ),
);
