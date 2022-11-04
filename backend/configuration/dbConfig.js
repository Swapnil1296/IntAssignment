





const Promise = require("bluebird");
const Config = require("./config");
const initOptions = {
  promiseLib: Promise,
  query(e) {
    // console.log(e.query); // SATYAJIT
  },
  error(error, e) {
    if (e.cn) {
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: Config.db.host, 
  port: Config.db.port, 
  database: Config.db.database,
  user: Config.db.user,
  password: Config.db.password,
};
// const cn = 'postgres://process.env.DB_USER:process.env.DB_PASS@process.env.DB_HOST:process.env.DB_PORT/process.env.DB_NAME';

pgp.pg.types.setTypeParser(1114, (s) => s);

const db = pgp(cn); // database instance;

db.connect()
  .then((obj) => {
    obj.done();
     // success, release the connection;
     console.log("db connection established");
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;

