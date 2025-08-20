# `middlewares`

> All the middlewares we create will be stored here. we will use them later across our app.

## Usage

```
const middlewares = require('@neiv/middlewares');


```

Currently I created a default auth midleware which can handle multiple auth records as well as single. so let's say you have 1 role to authenticate for
the logged in user, Let's say the route there is just for the `super_admin`
we can define this middleware as below:

```
const { authMiddleware } = require('@neiv/middlewares');

route.get('/path', authMiddleware('super_admin'), SomeController.getValue);

```

The above code will tell middleware to check that only the use with role
`super_admin` can access this.

Now if we want to validate some route where more than one roles can access
the same route. we will define roles in array:

```
const { authMiddleware } = require('@neiv/middlewares');

route.get('/path', authMiddleware(['super_admin', 'site_admin']), SomeController.getValue);

```

This way it will allow user who has any of this role.


I have added roles dynamically here. so if you will look at the `packages/config/configs/auth.js` files. you will have 2 object keys for it.

### 1. roleNumberToName: 

The `roleNumberToName` key will have our defined role numbers and their name.

### 2. roleNameToNumber

The `roleNameToNumber` is exactly reverse of `roleNumberToName` it will help us to transform role name into number. I have used this one for the `authMiddlewate` so whatever role name we are defining in the `authMiddleware` should be available for both of these keys.


