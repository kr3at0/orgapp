import dotenv from 'dotenv';
import convict from 'convict';
import { join } from 'path';

const envPath = join(__dirname, '..', `.env`);

dotenv.config({ path: envPath });

export const config = convict({
    env: {
        doc: 'Application environment',
        format: ['development', 'staging', 'production', 'test'],
        env: 'NODE_ENV',
        default: 'development'
    },
    db: {
        connection: {
            user: {
                doc: 'The username used to connect to the relational DB server',
                format: String,
                env: 'DB_USER',
                default: process.env.DB_USER,
            },
            password: {
                doc: 'The password used to connect to the relational DB server',
                format: String,
                env: 'DB_PASSWORD',
                default: process.env.DB_PASSWORD,
            },
            database: {
                doc: 'The name of the DB to use on the relational DB server',
                format: String,
                env: 'DB_DATABASE_NAME',
                default: process.env.DB_DATABASE_NAME,
            },
            host: {
                doc: 'The hostname/ip address of the relational DB server',
                format: String,
                env: 'DB_HOST',
                default: '127.0.0.1',
            },
            port: {
                doc: 'The port of the relational DB server',
                format: Number,
                env: 'DB_PORT',
                default: 5432,
            },
        },
        client: {
            doc: 'The name of the SQL client adapter used for relational DB server (postgresql, mysql, etc.)',
            format: String,
            env: 'DB_CLIENT',
            default: 'postgresql',
        },
        pool: {
            min: {
                doc: 'The minimum amount of connections in the DB connection',
                format: Number,
                env: 'DB_POOL_MIN',
                default: 2,
            },
            max: {
                doc: 'The maximum amount of connections in the DB connection',
                format: Number,
                env: 'DB_POOL_MAX',
                default: 10,
            },
        },
        acquireConnectionTimeout: {
            doc: 'The amount of ms to wait for a connection to be acquired from the pool',
            format: Number,
            env: 'DB_AQ_CONN_TIMEOUT',
            default: 120000,
        },
    },
});

config.validate();