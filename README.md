# @datalogix/v-admin-auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Authentication module for @datalogix/v-admin

- [✨ &nbsp;Release Notes](./CHANGELOG.md)

## Setup

- Add `@datalogix/v-admin-auth` dependency using `yarn` or `npm` to your project

```bash
yarn add @datalogix/v-admin-auth
```

OR

```bash
npm install @datalogix/v-admin-auth --save
```

## Usage

```js
import { createAdmin } from '@datalogix/v-admin'
import { createAuthModule } from '@datalogix/v-admin-auth'

createAdmin({
  modules: [
    createAuthModule(/* options */)
  ]
})
```

## Options

-

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn serve` or `npm run serve`

## License

[MIT License](./LICENSE)

Copyright (c) Datalogix

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@datalogix/v-admin-auth/latest.svg
[npm-version-href]: https://npmjs.com/package/@datalogix/v-admin-auth

[npm-downloads-src]: https://img.shields.io/npm/dt/@datalogix/v-admin-auth.svg
[npm-downloads-href]: https://npmjs.com/package/@datalogix/v-admin-auth

[github-actions-ci-src]: https://github.com/datalogix/v-admin-auth/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/datalogix/v-admin-auth/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/datalogix/v-admin-auth.svg
[codecov-href]: https://codecov.io/gh/datalogix/v-admin-auth

[license-src]: https://img.shields.io/npm/l/@datalogix/v-admin-auth.svg
[license-href]: https://npmjs.com/package/@datalogix/v-admin-auth
