# `database`

Anything related to database will stay here like Models, migrations, seeders and main database connectivity configurations. we have a connection function here which we will be using later to perform database operations inside services. we are using `objection.js` for all the database management. for further details, visit: https://vincit.github.io/objection.js/


### New Model:

Whenever you need to create a new model, create it inside `packages/database/src/models`. and then register that model in `index.js` file inside the same directory.
