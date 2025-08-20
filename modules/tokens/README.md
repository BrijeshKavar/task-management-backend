# `tokens`

> This module contains a logic to generate 3 different types of tokens.

1. JWT

The main JWT token we will use while authenticating user. all the logic of generating, validating, fetching token is inside this jwt helper.

```javascript
const { jwt } = require('@neiv/tokens');

// To sign a new token

jwt.signJwt(DATA, REMEMBER_ME_BOOLEAN, (err, token)=>{
    if(err){
        // Something went wrong, perform needed operations and return
    }
    // You will have a token.
})

// TO fetch token from the request, it will try to fetch token either from 
// Authorization header or from query params. if it finds the token, it will
// return token otherwise null. 
const token = jwt.findJwt(req);

// To validate the token:

jwt.validateJwt(token, (err, details) =>{
    if(err){
        // Token is invalid. perform some operations and return.
    }
    // Token validated and decoded, you will have all the details you passed while signing a new token
})

```

2. Password

Password helper are to encrypt a password and store in the database or to verify the password.

```javascript
const { password } = require('@neiv/tokens');

// TO encrypt a password

const encrypted = password.encryptPassword(PASSWORD);

// TO validate the password

const isValid = password.comparePassword(HASHED_PASSWORD, NORMAL_PASSWORD);

// isValid will return boolean. if it returns false, that means the password is not valid.

```

3. Custom Token

Custom tokens are for everything else apart from it. wherever we need a which is not JWT or password, we will use Custom tokens. Especially for the different types of mail invitations. In the background, we are using JWT to generate this token so that we can pass some data inside the token and can also set the expiry of the token so that we do not need to handle it inside the database. the default expiry of custom tokens is 2 days.

```javascript
const { customToken } = require('@neiv/tokens');

// To generate a new token

const newEmailToken = customToken.generateToken(DATA, '5d');
// Note that 5d is the expiration of the token. 5d means 5 days.

// To verify and decode the token

const decodedData = customToken.decodeToken(TOKEN);
// This will return decoded data from the token if token is valid. otherwise it will just return null.

```