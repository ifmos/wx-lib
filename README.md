# wx-lib

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/alexjoverm/typescript-library-starter.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/alexjoverm/typescript-library-starter.svg)](https://travis-ci.org/alexjoverm/typescript-library-starter)
[![Coveralls](https://img.shields.io/coveralls/alexjoverm/typescript-library-starter.svg)](https://coveralls.io/github/alexjoverm/typescript-library-starter)
[![Dev Dependencies](https://david-dm.org/alexjoverm/typescript-library-starter/dev-status.svg)](https://david-dm.org/alexjoverm/typescript-library-starter?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/AJoverMorales)

**Fork from [alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter.git), with some custom modifies.** A starter project that makes creating a TypeScript library extremely easy.

![guide](https://i.imgur.com/opUmHp0.png)

## Usage

```bash
npm install wx-lib

# or use yarn (recommended)
yarn add wx-lib
```

```javascript
import WxLib from 'wx-lib'
const wxLib = new WxLib()
```

### API

 - `onSDKReady`: Trigger when jweixin sdk load
 - `onSigined`: Trigger when wx config and ready 
 - `getSigned`: Which place to return options to get signed
