<div align="center">
  <h1>Graphpack</h1>

☄️ A minimalistic zero-config GraphQL server

Check out the [demo](https://codesandbox.io/s/k3qrkl8qlv) on CodeSandbox: https://codesandbox.io/s/k3qrkl8qlv

</div>

<hr>

## What is included?

Graphpack lets you create GraphQL servers _with zero configuration_. It uses [`webpack`](https://github.com/webpack/webpack) with [`nodemon`](https://github.com/remy/nodemon) and [`Apollo Server`](https://github.com/apollographql/apollo-server) under the hood, so we get features like Live Reloading, GraphQL Playground, GraphQL Imports and many more right out of the box.

- 📦 **Zero-config** out of the box
- 🚦 Built-in **Live reload**
- 🚨 Super-friendly error messages
- 🎮 [**GraphQL Playground**](https://github.com/prisma/graphql-playground) IDE
- ⭐️ [**GraphQL imports**](https://github.com/prisma/graphql-import) in Schema Definition Language
- 🔥 [**Blazing fast**](https://twitter.com/acdlite/status/974390255393505280) bundle times
- ⚡️ **ES module imports** and dynamic `import()`'s thanks to [Babel](https://github.com/babel/babel)

## Install & Usage

```
yarn add --dev graphpack
```

### Add schema and resolvers

Add `src/schema.graphql` and add some example types in [SDL](https://graphql.org/learn/schema/#type-language):

```graphql
type Query {
  hello: String
}
```

Add `src/resolvers.js`:

```js
const resolvers = {
  Query: {
    hello: () => 'world!',
  },
};

export default resolvers;
```

### Setup `package.json` run scripts

Add following scripts to your `package.json`:

```json
  "scripts": {
    "dev": "graphpack",
    "build": "graphpack build"
  },
```

### Start development server

To start the development server, simply run:

```sh
yarn dev
```

### Create production build

To create a production ready build run following command:

```sh
yarn build
```

### Use production build

Add following script that executes our build:

```json
  "scripts": {
    "start": "node ./build/index.js"
  },
```

Following command will run the build and start the app

```sh
yarn start
```

> Make sure to create a build before running the start script.

## CLI Commands

### `graphpack` (alias `graphpack dev`)

Runs graphpack in development mode. After a successful build your output should look something like this:

<div align="center">
  <img src="https://user-images.githubusercontent.com/5080854/47042315-3e426c80-d18b-11e8-941e-e193a339e3ee.png" width="519" alt="graphpack">
</div>

Graphpack will watch for changes in your `./src` folder and automatically reloads the server.

### `graphpack build`

Creates a production ready build under the project roots `build` folder.

> Make sure to run `yarn build` before.

## Entry files

### `src/resolvers.js` (required)

In this file you define all your resolvers:

```js
// src/resolvers.js
const resolvers = {
  Query: {
    article: (obj, args) => getArticleById(args.id),
    articles: () => getArticles(),
  },
};

export default resolvers;
```

> You can use any of these folder/file structure:
>
> - `src/resolvers.js`
> - `src/resolvers/index.js`

### `src/schema.js` (required)

Here you define all your GraphQL type definitions:

```graphql
# src/schema.graphql
type Article {
  title: String
  body: String
}

type Query {
  article: Article
  articles: [Article!]!
}
```

Alternatively you can create a `src/schema.js` and use the template literal tag `gql` by [`graphql-tag`](https://github.com/apollographql/graphql-tag):

```js
// src/schema.js
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Article {
    title: String
    body: String
  }

  type Query {
    article: Article
    articles: [Article!]!
  }
`;

export default typeDefs;
```

Note that you need install `graphql-tag` in this case.

> Graphpack can resolve both `.js` and `.graphql` files. This means you can use any of these folder/file structure:
>
> - `src/schema.js`
> - `src/schema/index.js`
> - `src/schema.graphql`
> - `src/schema/index.graphql`

### `src/context.js`

Create `src/context.js` and do following:

```js
const context = req => ({
  /* context props here */
});

export default context;
```

> You can use any of these folder/file structure:
>
> - `src/context.js`
> - `src/context/index.js`

### `src/config.js`

In `src/config.js` you can set further options of your Apollo Server. Refer to the [Apollo Server docs](https://www.apollographql.com/docs/apollo-server/api/apollo-server.html#constructor-options-lt-ApolloServer-gt) for more details about the options.

```js
// src/config.js
const IS_DEV = process.env.NODE_ENV !== 'production';

const config = {
  debug: process.env.DEBUG,
  playground: IS_DEV,
  introspection: IS_DEV,
  mocks: IS_DEV,
  // ...
};

export default config;
```

Note that you cannot to set `resolvers`, `typeDefs` or `context` in the config file. In these cases please refer to [entry files](#entry-files).

> You can use any of these folder/file structure:
>
> - `src/config.js`
> - `src/config/index.js`

## Custom configuration

For custom configuration you can create a `graphpack` config file in [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) format:

- `graphpack.config.js`
- `graphpack` field in `package.json`
- `.graphpackrc` in JSON or YAML
- `.graphpackrc` with the extensions `.json`, `.yaml`, `.yml`, or `.js`

### Customize Webpack configuration

To extend webpack, you can define a function that extends its config via the config file:

```js
// graphpack.config.js
module.exports = {
  webpack: ({ config, webpack }) => {
    // Add customizations to config
    // Important: return the modified config
    return config;
  },
};
```

### Customize Babel configuration

Add an optional `babel.config.js` to your project root with the following preset

```js
// babel.config.js
module.exports = api => {
  // Cache the returned value forever and don't call this function again
  api.cache(true);

  return {
    presets: ['graphpack/babel'],
    // ... Add your plugins and custom config
  };
};
```

> Note that this file is not going through babel transformation.

## Acknowledgements

Graphpack was heavily inspired by:

- [backpack](https://github.com/jaredpalmer/backpack)

## License

MIT
