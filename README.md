## Configuration:

The boilerplate is built with the lerna monorepo configuration.

The first step of the configuration after clonig repository is to install all the dependancies:

```javascript
nvm use 18 && npm install && npm run bootstrap

```

Once it's done, your first command would be `npm run setup-keys`. this command will prepare the boilerplate for you and specifically JWT secret key and private key. We are not using basic string based authentication approach here so this command will create a new private and public key inside `packages/tokens/src/jwt`. visit that directory and make sure both `private-Key.key` and `public-Key.pub` is available now.

Now your boilerplate is ready to go and you can simply run watch or start command to start the app.

```javascript

// To watch changes while working
npm run watch

// To run app in the production
npm start

// To run build
npm run build

```

### Set the .env file
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=Techuz@123
DATABASE_NAME=task_management

### Additional commands to add tables and data:

```javascript
// This command will execute the migration and perform the operations you defined in the migration file.
npm run migrate

// This command will be used to execute seed file.
npm run run-seed

```