# graphpack

A minimalistic zero-config GraphQL server

## What is included

tbd

## Install

With yarn:

```
yarn add graphpack
```

With npm:

```
npm install graphpack
```

## Usage

Add following run script to your `package.json`:

```json
  "scripts": {
    "start": "graphpack"
  },
```

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

> If you prefer to write the type definitions in JS and parse the queries with [graphql-tag](https://github.com/apollographql/graphql-tag), just save your schema as a JS file under `src/schema.js`. It's also possible to create separate folders `src/schema/index.js` and `src/resolvers/index.js`.
