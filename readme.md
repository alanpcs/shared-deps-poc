# TypeScript Package POC

## Installing using yarn

`yarn` is not yet fully [supported by github packages](https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#supported-clients-and-formats). In order to use it with `yarn`, do the following:

### Authentication for this scoped repo 

In the same folder of package.json, you must have a `.npmrc` file with the following:
```
always-auth=true
registry=https://npm.pkg.github.com/demonkart
_authToken=${NPM_TOKEN_GITHUB}
//npm.pkg.github.com:_authToken=${NPM_TOKEN_GITHUB}
```

### Adding the dependency 

#### using the yarn cli:
`yarn add @demonkart/shared-deps-poc --update-checksums`


#### or directly in the `package.json` file:
```
 "dependencies": {
    "@demonkart/shared-deps-poc": "^1.0.2",
  }
```
and then running `yarn --update-checksums`

# Contributing

## Build project

```sh
npm run build
```

## Test pacakge

```sh
npm test
```

## Deploy package

```sh
npm run deploy
```
