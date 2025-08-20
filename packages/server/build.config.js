/** You must add any new globals to typings.d.ts*/
/** The values must be stringified to be inlined into the code. **/
/** Be careful about unintentionally creating truthy expressions when adding defaults (e.g. || '') **/

const config = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  __SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT || process.env.PORT || 8080)
};

module.exports = config;
