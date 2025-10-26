# TypeScript Package POC

## Deploying the package

In order to deploy the code into the Github NPM package registry, you will need to login in it.

I suggest following the steps from 1 to 6 of this article:
https://dev.to/dalenguyen/create-your-first-github-package-564f


## Using yarn to version the package

`yarn version` can be used when deploying a new version during the pipeline process. Some use arguments are `--major`, `--minor` and `--patch` to update the respectively numbers automatically.

## Installing using yarn

`yarn` is not yet fully [supported by github packages](https://help.github.com/en/github/managing-packages-with-github-packages/about-github-packages#supported-clients-and-formats).

In order to use it with `yarn`, do the following:

### Authentication for this scoped repo

In the same folder of package.json, you must have a `.npmrc` file with the
following:

```
@alanpcs:registry=https://npm.pkg.github.com/
```

### Private repos

If the package is published to a private repository, a github [Personal Access
Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
will be required for yarn being able to find and install it. In the CI pipelines
that uses the private package, the `.npmrc` should have the additional line below:

```
//npm.pkg.github.com/:_authToken=${MY_GITHUB_TOKEN}
@alanpcs:registry=https://npm.pkg.github.com/
```

This extra line contains the `_authToken` environment variable
(`MY_GITHUB_TOKEN` in this example) which should have the PAT created above as
the value.

> Note: The CI pipeline must have an env var with the same name and its value
> (the PAT) should come from a secret for security reasons.

### Adding the dependency

To add it via yarn:

```sh
yarn add @alanpcs/shared-deps-poc
```

If you prefer to edit `package.json` directly:
```
 "dependencies": {
    "@alanpcs/shared-deps-poc": "^1.0.4",
  }
```
and then running `yarn --update-checksums`

# Contributing

## Build project

```sh
yarn build
```

## Test pacakge

```sh
yarn test
```

## Deploy package

```sh
yarn deploy
```
