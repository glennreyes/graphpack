![Graphpack](https://user-images.githubusercontent.com/5080854/47752201-1dead580-dc94-11e8-8028-580207f85feb.png)

<div align="center">

☄️ A minimalistic zero-config GraphQL server

Check out the demo on CodeSandbox: https://codesandbox.io/s/k3qrkl8qlv

</div>

<hr>

## What is included?

Graphpack lets you create GraphQL servers _with zero configuration_. It uses [`webpack`](https://github.com/webpack/webpack) with [`nodemon`](https://github.com/remy/nodemon) and [`Apollo Server`](https://github.com/apollographql/apollo-server) under the hood, so we get features like Live Reloading, GraphQL Playground, GraphQL Imports and many more right out of the box.

- 📦 **Zero-config** out of the box
- 🚦 Built-in **Live reload**
- 🚨 Super-friendly error messages
- 🎮 [**GraphQL Playground**](https://github.com/prisma/graphql-playground) IDE
- ⭐️ [**GraphQL imports**](https://github.com/prisma/graphql-import) in Schema Definition Language
- 💖 [**TypeScript**](https://www.typescriptlang.org/) support
- 🔥 [**Blazing fast**](https://twitter.com/acdlite/status/974390255393505280) bundle times
- ⚡️ **ES module imports** and dynamic `import()`'s thanks to [Babel](https://github.com/babel/babel)

## Install & Usage

```
yarn add --dev graphpack
```

### Add `src/schema.graphql` and `src/resolvers.js`

```
src
├── resolvers.js
└── schema.graphql
```

In your schema, add some sample types in [SDL](https://graphql.org/learn/schema/#type-language):

```graphql
type Query {
  hello: String
}
```

In `src/resolvers.js`:

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

To create a production-ready build run following command:

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
  <img src="https://user-images.githubusercontent.com/5080854/47042315-3e426c80-d18b-11e8-941e-e193a339e3ee.png" width="520" alt="Graphpack">
</div>

Graphpack will watch for changes in your `./src` folder and automatically reload the server.

### `graphpack build`

Creates a production-ready build under the project roots `build` folder.

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

### `src/schema.graphql` (required)

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

Note that in this case you will need to install `graphql-tag`.

> Graphpack can resolve both `.js` and `.graphql` files. This means you can use any of these folder/file structures:
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

> You can use any of these folder/file structures:
>
> - `src/context.js`
> - `src/context/index.js`

## Custom configuration

For custom configuration you can create a `graphpack` config file in [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) format:

- `graphpack.config.js` (recommended)
- `graphpack` field in `package.json`
- `.graphpackrc` in JSON or YAML
- `.graphpackrc` with the extensions `.json`, `.yaml`, `.yml`, or `.js`

> Note that the config file (eg. graphpack.config.js) is not going through babel transformation.

### Customize Server configuration

In your `graphpack.config.js` configure your server as follows:

```js
// graphpack.config.js
module.exports = {
  server: {
    introspection: false,
    playground: false,
    applyMiddleware: { app, path }, // app is from an existing (Express/Hapi,...) app
  },
};
```

Return config as a function to get the env variable:

```js
// graphpack.config.js

// `mode` will be either `development` or `production`
module.exports = (mode) => {
  const IS_DEV = mode !== 'production';

  server: {
    introspection: IS_DEV,
    playground: IS_DEV,
    mocks: IS_DEV,
    mocks: IS_DEV,
    // ...
  }
};

export default config;
```

Refer to the [Apollo Server docs](https://www.apollographql.com/docs/apollo-server/api/apollo-server.html#constructor-options-lt-ApolloServer-gt) for more details about the options.

> Note that it's not possible to set `resolvers`, `typeDefs` or `context` in the config file. For this please refer to [entry files](#entry-files).

#### Applying middlewares to the server

In your `graphpack.config.js` add your applyMiddleware field as follows:

```js
// graphpack.config.js
const express = require('express');
const app = express();

module.exports = {
  server: {
    introspection: false,
    playground: false,
    applyMiddleware: { app },
  },
};
```

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

Add an optional `babel.config.js` to your project root with the following preset:

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

## Acknowledgements

Graphpack was heavily inspired by:

- [backpack](https://github.com/jaredpalmer/backpack)
- [create-react-app](https://github.com/facebook/create-react-app)
- [next.js](https://github.com/zeit/next.js)

Thanks to [@richardbmx](https://github.com/richardbmx) for designing the [logo](https://figma.com/file/XyKbNTDI9lwoJNr91l91bQ7C/Graphpack)! 🙌

## Contributors

This project exists thanks to all the people who contribute.
<a href="https://github.com/glennreyes/graphpack/graphs/contributors"><img src="https://opencollective.com/graphpack/contributors.svg?width=890" title="contributors" alt="contributors" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/graphpack#backer)]

<a href="https://opencollective.com/graphpack#backers" target="_blank"><img src="https://opencollective.com/graphpack/backers.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/graphpack#sponsor)]

<a href="https://opencollective.com/graphpack/sponsor/0/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/1/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/2/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/3/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/4/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/5/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/6/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/7/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/8/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/graphpack/sponsor/9/website" target="_blank"><img src="https://opencollective.com/graphpack/sponsor/9/avatar.svg"></a>

## License

MIT
