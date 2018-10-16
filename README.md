# [Graphpack](https://codesandbox.io/s/k3qrkl8qlv)

☄️ A minimalistic zero-config GraphQL server

Check out the [demo](https://codesandbox.io/s/k3qrkl8qlv) on CodeSandbox: https://codesandbox.io/s/k3qrkl8qlv

## What is included

Graphpack utilizes [`webpack`](https://github.com/webpack/webpack)with [`nodemon`](https://github.com/remy/nodemon) and lets you create GraphQL servers with zero configuration. It uses [`Apollo Server`](https://github.com/apollographql/apollo-server) under the hood, so we get features like [GraphQL Playground](https://github.com/prisma/graphql-playground), [GraphQL Imports](https://github.com/prisma/graphql-import) and many more right out of the box.

- 📦 **Zero-config** out of the box experience
- 🚦 Built-in **Live reload** and automatic recompilation
- 🚨 Super-friendly error messages
- 🎮 GraphQL **Playground** IDE
- ⭐️ **GraphQL imports** in Schema Definition Language
- 🔥 [**Blazing fast**](https://twitter.com/acdlite/status/974390255393505280) bundle times
- ⚡️ **ES module imports** thanks to [Babel](https://github.com/babel/babel)

## Install

With yarn:

```
yarn add --dev graphpack
```

With npm:

```
npm install --save-dev graphpack
```

## Usage

### Add entry files: `src/schema.graphql` & `src/resolvers.js`

Add your type definitions under `src/schema.graphql` and add some example types in [SDL](https://graphql.org/learn/schema/#type-language):

```graphql
type Query {
  hello: String
}
```

Add your resolvers under `src/resolvers.js`:

```js
const resolvers = {
  Query: {
    hello: () => 'world!',
  },
};

export default resolvers;
```

> Graphpack can resolve both `.js` and `.graphql` files. This means you can use any of these folder/file structure:
>
> - `src/resolvers.js`
> - `src/resolvers/index.js`
> - `src/schema.js`
> - `src/schema/index.js`
> - `src/schema.graphql`
> - `src/schema/index.graphql`

### Setup npm run scripts

Add following run scripts to your `package.json`:

```json
  "scripts": {
    "build": "graphpack build",
    "dev": "graphpack"
  },
```

### Start dev server:

```sh
yarn dev
```

### Create a production build

```sh
yarn build
```

### Start production build

Simply run the build command and start the app

```sh
yarn build
node ./build/index.js
```

## CLI Commands

### `graphpack` (alias `graphpack dev`)

Runs graphpack in development mode.

### `graphpack build`

Creates a production ready build under the project roots `build` folder.

> Make sure to run `yarn build` before.

## Entry files

tbd

### `src/resolvers.js` (required)

tbd

### `src/schema.js` (required)

tbd

### `src/context.js`

tbd

### `src/config.js`

tbd

## Customize configuration

tbd

### Webpack

tbd

### Apollo Server

tbd

## Acknowledgements

Graphpack was heavily inspired by:

- [backpack](https://github.com/jaredpalmer/backpack)

## License

MIT
