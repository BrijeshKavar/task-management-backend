# `xacml`

> Xacml is specifically made to validate request with database data. we already have a request validation set for whatever is coming from body, params or query of request. but that won't validate the actual data. and we need to test those data within controller or service. for example You want to register a user but you also need to check if the user with that email address is already registered, You will need to test them within service and cntroller. those are small things but small things together makes a large lines of code which later becomes hard to debug. This is the reason why I am adding xacml policies in our system which will work as a middleware and checks all these stuffs before entering to the controller so that we can stay away from those checks and can keep our controller and services the way they ment to be instead of putting these checks inside them.

## Usage

Xacml has total 2 jobs. first one is to validate the request(params, body, query) coming from the client and second is to verify the data coming from the client is acutally valid.

Xacml will work as a middleware where we have 3 total parameters to pass. let's take an example of registration request here.

### 1. validation:

This is a place where we will define our validation. that validates the data coming from the client. I tried to automate this validation part as much as I can within the xacml. The only thing we have to make sure while creating a validation schema is that we must have to define it where it comes from. like if it's coming from `body` or `params` or `query`. Example

```javascript
// If you are validating body of request, your validation schema would be
const registrationSchema = {
  body: {
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};
// If you are validating params of request, your validation schema would be
const registrationSchema = {
  params: {
    organizationId: Joi.number().required(),
  },
};
// And same goes for query.
// You also can validate both together like:
const registrationSchema = {
  body: {
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
  params: {
    organizationId: Joi.number().required(),
  },
};
// This will validate the keys from both body and params
// and will let you pass only if both of these validation
// objects pass.
```

### 2. pre:

`pre` is a section where we will fetch the data from database which are required while validating the request. with same example of registration, let's say we here want to check if same email address is exist in our system. so here the role of pre is to fetch the user with that email address.

Note that pre will have access to `params, body, query, user` coming from the request.
so you will have all you need. and also note that pre always need to be an array.

pre has to keys:

1. assign => It is a name of that particular fetch.
2. method => Method is the place where we will call our query and return a data.

```javascript
const registrationPre = [
  {
    assign: 'user',
    method: (req) => {
      return User.query().where('email', req.body.email);
    },
  },
];
```

Here you can add more than 1 pre. let say you need two different data to verify like user and organization:

```javascript
const registrationPre = [
  {
    assign: 'userByEmail',
    method: (req) => {
      return User.query().where('email', req.body.email);
    },
  },
  {
      assign: 'organization',
      method: (req) => {
          return Organization.query().findById(req.params.organizationId);
      }
  }
];
```
That is the role of pre. pre will fetch all the data which we need to validate and it will provide those data to our next step which is `secondaryValidation`.

### 3. secondaryValidation:

`secondaryValidation` is the actual place where we will be able to validate the data which we fetch in our previous pre step. note that whatever we fetch with pre will be available for the secondaryValidation. and also note that `secondaryValidation` also needs to be in array. even if it's a single validation.

Here we will have access to all data of request(body, params, query, user) and one additional key `pre`.

```javascript

const registrationValidation = [
{
    assign: 'checkUserExist',
    method: (req) => {
        return !req.pre.userByEmail
    }
},
{
    assign: 'checkFromSameOrganization',
    method: (req) => {
        return req.pre.userByEmail.org_id === req.organization.id
    }
}
]

```

So here we are using the data which we fetched using pre and using them here to validate everything we should.


Now let's put all of these together in our `accessControl` middleware.

```javascript

const { accessControl } = require('@neiv/xacml');

router.post('/registration', accessControl({
  validation: registrationSchema,
  pre: registrationPre,
  secondaryValidation: registrationValidation
}))

```

That's it! Now it will first validate the data coming from the request with joi and after that it will fetch everything we defined in `pre` and it will validate everything we defined in `secondaryValidation`. if everything passes, it will go to the controller otherwise it will send a `400` Bad Request response and won't reach to the controller. so now we can put anything check releted logic inside accessControl and will user controller and service just to perform just the operation what it ment to. The advantage of this is that we can create a reusable service function without any sort of different checks of any data availability as each request will have it's own `pre` and we might already have validated those data there and can call the service without any checks.