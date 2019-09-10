import { config } from './config';

const env = config.get('env');
export const dbConfig = config.get('db');

require('pg').types.setTypeParser(20, 'text', parseInt);


if (env == 'test') {
  dbConfig.connection.database += '-test';
}

exports.default = exports[env] = dbConfig;