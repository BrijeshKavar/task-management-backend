# `config`

This directory is specifically for storing constants and helper functions which we will use later on across the app. anything like date format, database config, email config, constants etc will be stored inside config package.

## Usage

```
const config = require('config');

const appName = config.app.appName;
```

Note: Make sure whenever you create new config file, you will need to register it inside `packages/config/index.js`
