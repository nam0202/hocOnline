const singleton = Symbol();
const singletonEnforcer = Symbol();
const knex = require('knex');
const Config = require('../rest-config');
const config = Config.instance;
const path = require('path');
const PATH = Config.getPath;
const GLOBAL_FILE = Config.getNameFileGlobal(PATH);
const METADATA_FILE = Config.getNameFileMeta(PATH);
const knexHooks = require('../rest-knex-hook/src/knex-hooks');

class DatabaseConnector {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
        config.load([path.join(Config.getPath, GLOBAL_FILE),path.join(Config.getPath , METADATA_FILE)]);
        this.db = null;
        this.connect();
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new DatabaseConnector(singletonEnforcer);
        }

        return this[singleton];
    }
    connect() {
        const dbconfig = config.global('database');
        try {
            this.db = knex({
                client: dbconfig.driver,
                version: '5.7',
                connection: {
                    host : dbconfig.host,
                    port: dbconfig.port,
                    user: dbconfig.user,
                    password: dbconfig.password,
                    database: dbconfig.name
                },
                migrations: {
                    tableName: 'knex_migrations',
                    directory: path.join(PATH,'migrations')
                }
            });
            this.db.migrate.latest();
            knexHooks(this.db);
        }
        catch(e) {
            throw new Error('Cannot connect Database with config ', dbconfig);
        }
    }

    getConnect() {
        return this.db;
    }
    getRef(tableName){
        let table = config.metadata("definitions").find((item)=>{
            if(!!item[tableName]){
                return item;
            }
        });
        return table[tableName].ref;
    }
}
module.exports = DatabaseConnector;
