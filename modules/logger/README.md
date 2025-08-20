# `logger`

This is a main logger package. we currently added 2 types of log right now. 1 is `minilog` custom logger and second one is related to `knex` query log.

1. minilog

Since we are not allowing console.log in our app, we will be using minilog to appropriate logging if needed anywhere.

```javascript
const { log } = require('@neiv/logger');

log.info('This is the log information.');
log.error('This is to log when we get error somewhere');
```
For further details of minilog, visit: https://www.npmjs.com/package/minilog

2. query log

Query log is already set in a way to log mysql queries when needed. all you need to do to enable query logs is to set the environment variable `DEBUG_SQL=1` and that's it. You will see all the sql queries which are executing inside your console.